const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');
const emojis = require('../../jsons/emojis.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coin-flip')
		.setDescription('Flips a coin.')
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM),

	async execute(interaction) {

		// Random 50/50 result
		const isHeads = Math.random() < 0.5;

		// Create a new embed for the result
		const resultEmbed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		// Heads result
		if (isHeads) {
			resultEmbed.setTitle(`It landed on heads ${emojis.copper}!`);
			await interaction.reply({ embeds: [resultEmbed] });
			return;
		}

		// Tails result
		resultEmbed.setTitle(`It landed on tails ${emojis.coin}!`);
		await interaction.reply({ embeds: [resultEmbed] });
	},
};