const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserModel = require('../../schema/User.js')
const emojis = require('../../jsons/emojis.json')

module.exports = {
	data: new SlashCommandBuilder().setName('coin-flip').setDescription('flips a coin'),
	
	async execute(interaction) {
		const coin = Math.random();
		console.log(coin);

		if(coin === 0) {
			const exampleEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle(`it landed on heads ${emojis.copper}!`)
				.setTimestamp()
				.setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

			await interaction.reply({ embeds: [exampleEmbed] });

			return

		} else {
			const exampleEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle(`it landed on tailes ${emojis.coin}!`)
				.setTimestamp()
				.setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

			await interaction.reply({ embeds: [exampleEmbed] });

			return
		}

		
	},
};