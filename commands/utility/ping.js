const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserModel = require('../../schema/User.js')

module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),
	
	async execute(interaction) {
		await UserModel.findOneAndUpdate(
    		{ _id: interaction.user.id },
    		{ $inc: { balance: 10 } },   // <-- updates balance directly in DB
    		{ upsert: true, new: true, setDefaultsOnInsert: true });

		const exampleEmbed = new EmbedBuilder()
	.setColor(0xDE8050)
	.setTitle('Pong!')
	.setDescription('you have pinged the bot sucsessfuly!')
	.setTimestamp()
	.setFooter({ text: '©2025 copper', iconURL: 'https://i.imgur.com/StODuzm.png' });

	await interaction.reply({ embeds: [exampleEmbed] });
	},
};