const { SlashCommandBuilder, EmbedBuilder, InteractionFlagsBits } = require('discord.js');
const UserModel = require('../../schema/User.js')
const emojis = require('../../jsons/emojis.json')

module.exports = {
	data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('gives user balance')
        .addUserOption((option) =>
		    option
            .setName('user')
            .setDescription('user to see balance of')
            .setRequired(false),
	),
	
	async execute(interaction) {

        const user = interaction.options.getUser('user') || interaction.user;

        if(user.bot) {
            const exampleEmbed = new EmbedBuilder()
	            .setColor(0xDE8050)
	            .setTitle("You cant use /balance on a bot")
	            .setTimestamp()
	            .setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

            await interaction.reply({ embeds: [exampleEmbed], flags: 64 });

            return;
        }

        const doc = await UserModel.findOneAndUpdate(
                { _id: user.id },
                { $setOnInsert: { balance: 0 } },
                { upsert: true, new: true });

		const exampleEmbed = new EmbedBuilder()
	.setColor(0xDE8050)
	.setTitle(`${user.username} has ${doc.balance} ${emojis.coin}`)
	.setDescription('you have pinged the bot sucsessfuly!')
	.setTimestamp()
	.setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

	await interaction.reply({ embeds: [exampleEmbed] });
	},
};