const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('shop main command')
        .setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM)
        .addSubcommand((subcommand) =>
		subcommand
			.setName('info')
			.setDescription('Gives info about shop')
	    )
        .addSubcommand((subcommand) =>
		subcommand
			.setName('buy')
			.setDescription('buys an item from the shop')
            .addStringOption(option =>
			option
				.setName('item')
				.setDescription('User to send coins to')
				.setRequired(true)
	    )
        )
        .addSubcommand((subcommand) =>
		subcommand
			.setName('sell')
			.setDescription('sells an item for coins')
            .addStringOption(option =>
			option
				.setName('item')
				.setDescription('User to send coins to')
				.setRequired(true)
	    )
	    ),

    async execute(interaction) {
        const sub = interaction.options.getSubcommand(false);

        if(sub === 'info') {
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

        }

        if(sub === 'buy') {
            
        }

        if(sub === 'sell') {
            
        }
    },
};