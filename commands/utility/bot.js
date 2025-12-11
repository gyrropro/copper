const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');
const botInfo = require('../../package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot')
        .setDescription('Bot-related commands')
        .addSubcommand((subcommand) =>
		subcommand
			.setName('info')
			.setDescription('Gives info about copper')
	)

        .setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM),

    async execute(interaction) {

        if(interaction.options.getSubcommand() === 'info') {
                    const exampleEmbed = new EmbedBuilder()
            .setColor(0xDE8050)
            .setTitle('bot info:')
            .setDescription(botInfo.description)
            .addFields(
                { name: 'author:', value: botInfo.author, inline: true },
                { name: "servers:", value: interaction.client.guilds.cache.size.toLocaleString(), inline: true }
            )
            .addFields(
                { name: 'commands:', value: interaction.client.commands.size.toString(), inline: true },
                { name: "add me to your server!", value: 'https://discord.com/oauth2/authorize?client_id=1324168158612820038', inline: false },
                { name: "join the discord server!", value: 'https://discord.gg/U9NDF4rJQh', inline: false }
            )
            .setTimestamp()
            .setFooter({
                text: '©2025 copper',
                iconURL: 'https://i.imgur.com/StODuzm.png'
            });

            await interaction.reply({ embeds: [exampleEmbed]});
        }
    },
};