const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!')
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM),

	async execute(interaction) {

		// Basic response embed
		const exampleEmbed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTitle('Pong!')
			.setDescription('You have pinged the bot successfully!')
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		// Send reply with the embed
		await interaction.reply({ embeds: [exampleEmbed] });
	},
};
