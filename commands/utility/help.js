const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');
const dialogue = require('../../jsons/dialogue.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Shows how to use commands')
        .addStringOption((option) =>
		option
			.setName('category')
			.setDescription('Command catagorey')
			.setRequired(true)
			.addChoices(
				{ name: 'economey', value: 'economey' },
				{ name: 'utility', value: 'utility' }
			),
	    )
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM),

	async execute(interaction) {
        if(interaction.options.getString('category') == 'economey') {
            		// Basic response embed
		const Embed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTitle('Economey')
			.setDescription('economey commands:')
            .addFields(
                { name: '`/balance` `user`:', value: dialogue.help.economey.balance },
                { name: "`/beg`:", value: dialogue.help.economey.beg }
            )
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		// Send reply with the embed
		await interaction.reply({ embeds: [Embed] });
        
        } else if(interaction.options.getString('category') == 'utility') {
            		// Basic response embed
		const Embed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTitle('Utility')
			.setDescription('Utility commands:')
            .addFields(
                { name: '`/bot` `info`:', value: dialogue.help.utility.botInfo },
                { name: "`/coin-flip`:", value: dialogue.help.utility.coinFlip },
                { name: "`/help` `category`:", value: dialogue.help.utility.help },
                { name: "`/ping`:", value: dialogue.help.utility.ping },
            )
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		// Send reply with the embed
		await interaction.reply({ embeds: [Embed] });
        }
	},
};