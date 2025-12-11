const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');
const UserModel = require('../../schema/User.js');
const emojis = require('../../jsons/emojis.json');

module.exports = {

	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Displays balance information.')
		.addSubcommand(sub =>
			sub
				.setName('check')
				.setDescription('Check a user\'s balance.')
				.addUserOption(option =>
					option
						.setName('user')
						.setDescription('User to check the balance of.')
						.setRequired(false)
				)
		)
		.addSubcommand(sub =>
			sub
				.setName('top')
				.setDescription('Gives top ten balances.')
		)
		.setContexts(
			InteractionContextType.Guild,
			InteractionContextType.PrivateChannel,
			InteractionContextType.BotDM
		),

	async execute(interaction) {

		const sub = interaction.options.getSubcommand(false);

		// ======================
		//        /balance top
		// ======================
		if (sub === 'top') {

			const top = await UserModel.find({})
				.sort({ balance: -1 })
				.limit(10);

			let list = top
				.map((u, i) => `**${i + 1}.** <@${u._id}> — ${u.balance.toLocaleString()} ${emojis.coin}`)
				.join('\n');

			const topEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle('Top 10 Balances')
				.setDescription(list || 'No users found.')
				.setTimestamp()
				.setFooter({
					text: '©2025 copper',
					iconURL: 'https://i.imgur.com/StODuzm.png'
				});

			return interaction.reply({ embeds: [topEmbed] });
		}


		// ======================
		//      /balance check
		// ======================

		const user = interaction.options.getUser('user') || interaction.user;

		if (user.bot) {
			const botEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle('You cannot check the balance of a bot.')
				.setTimestamp()
				.setFooter({
					text: '©2025 copper',
					iconURL: 'https://i.imgur.com/StODuzm.png'
				});

			return interaction.reply({ embeds: [botEmbed], flags: 64 });
		}

		const doc = await UserModel.findOneAndUpdate(
			{ _id: user.id },
			{ $setOnInsert: { balance: 0 } },
			{ upsert: true, new: true }
		);

		const balanceEmbed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTitle(`${user.username} has ${doc.balance.toLocaleString()} ${emojis.coin}`)
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		return interaction.reply({ embeds: [balanceEmbed] });
	},
};
