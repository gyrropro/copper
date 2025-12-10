const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	async execute(interaction) {
		const exampleEmbed = new EmbedBuilder()
	.setColor(0xDE8050)
	.setTitle('Pong!')
	.setDescription('you have pinged the bot sucsessfuly!')
	.setTimestamp()
	.setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

		await interaction.reply({ embeds: [exampleEmbed] });
	},
};