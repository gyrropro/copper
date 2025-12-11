const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserModel = require('../../schema/User.js');
const emojis = require('../../jsons/emojis.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Displays a user\'s balance.')
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('User to check the balance of.')
				.setRequired(false)
		),

	async execute(interaction) {

		// Target = selected user OR the command user
		const user = interaction.options.getUser('user') || interaction.user;

		// Prevent checking balance on bots
		if (user.bot) {
			const botEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle('You cannot check the balance of a bot.')
				.setTimestamp()
				.setFooter({
					text: '©2025 copper',
					iconURL: 'https://i.imgur.com/StODuzm.png'
				});

			await interaction.reply({ embeds: [botEmbed], flags: 64 }); // ephemeral notice
			return;
		}

		// Get or create the user document (ensures balance exists)
		const doc = await UserModel.findOneAndUpdate(
			{ _id: user.id },
			{ $setOnInsert: { balance: 0 } }, // if new user: set balance = 0
			{ upsert: true, new: true }       // create if missing, return updated doc
		);

		// Construct balance response
		const balanceEmbed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTitle(`${user.username} has ${doc.balance} ${emojis.coin}`)
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		// Send balance result
		await interaction.reply({ embeds: [balanceEmbed] });
	},
};
