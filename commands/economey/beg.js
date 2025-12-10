const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserModel = require('../../schema/User.js')

module.exports = {
	data: new SlashCommandBuilder().setName('beg').setDescription('begs for coins'),
	
	async execute(interaction) {

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

        const user = UserModel.findById({_id: interaction.user.id}) ??
            await UserModel.create({ _id: interaction.user.id });

        const earned = getRandomInt(700)
        user.balance += earned;
        user.save();

        if(earned == 0) {
            const exampleEmbed = new EmbedBuilder()
	            .setColor(0xDE8050)
	            .setTitle(`you failed to earn coins`)
	            .setTimestamp()
	            .setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

            await interaction.reply({ embeds: [exampleEmbed] });
        } else {
            const exampleEmbed = new EmbedBuilder()
	            .setColor(0xDE8050)
	            .setTitle(`you earned ${earned} coins!`)
	            .setTimestamp()
	            .setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });
                
            await interaction.reply({ embeds: [exampleEmbed] });
        }

		const exampleEmbed = new EmbedBuilder()
	.setColor(0xDE8050)
	.setTitle(`you earned ${earned} coins!`)
	.setTimestamp()
	.setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

	await interaction.reply({ embeds: [exampleEmbed] });
	},
};