const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserModel = require('../../schema/User.js')
const emojis = require('../../jsons/emojis.json')

module.exports = {
	data: new SlashCommandBuilder().setName('beg').setDescription('begs for coins'),
	
	async execute(interaction) {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

        const earned = getRandomInt(700)

            await UserModel.updateOne(
        { _id: interaction.user.id },
        { $inc: { balance: earned } },
        { upsert: true });

        if(earned == 0) {
            const exampleEmbed = new EmbedBuilder()
	            .setColor(0xDE8050)
	            .setTitle(`you failed to earn anything`)
	            .setTimestamp()
	            .setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

            await interaction.reply({ embeds: [exampleEmbed] });
        } else {
            const exampleEmbed = new EmbedBuilder()
	            .setColor(0xDE8050)
	            .setTitle(`you earned ${earned} ${emojis.coin}!`)
	            .setTimestamp()
	            .setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });
                
            await interaction.reply({ embeds: [exampleEmbed] });
        }
	},
};