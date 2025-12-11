const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');
const UserModel = require('../../schema/User.js');
const emojis = require('../../jsons/emojis.json');
const dialogue = require('../../jsons/dialogue.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('beg')
		.setDescription('begs for coins')
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM),
	async execute(interaction) {

		// Current UNIX timestamp (in seconds)
		const now = Math.floor(Date.now() / 1000);

		// Random integer between 1 and max
		function getRandomInt(max) {
			return Math.floor(Math.random() * max + 1);
		}

		// Load user profile or create one if it doesn't exist
		const user =
			(await UserModel.findById(interaction.user.id)) ??
			(await UserModel.create({ _id: interaction.user.id }));

		// Cooldown check — prevents command use before cooldown expires
		if (user.cooldowns.get("beg") > now) {

			const exampleEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle(
					`you are on cooldown. please try again in <t:${user.cooldowns.get("beg")}:R>`
				)
				.setTimestamp()
				.setFooter({
					text: '©2025 copper',
					iconURL: 'https://i.imgur.com/StODuzm.png'
				});

			await interaction.reply({
				embeds: [exampleEmbed],
				flags: 64 // Sends ephemeral
			});

			return; // Stop execution while on cooldown
		}

		// 20% chance to fail earning coins
		if (getRandomInt(10) <= 2) {

			const exampleEmbed = new EmbedBuilder()
				.setColor(0xDE8050)
				.setTitle(`you failed to earn any ${emojis.coin}`)
				.addFields({
					name: ' ',
					value: dialogue.beg.failed[Math.floor(Math.random() * dialogue.beg.failed.length)]
				})
				.setTimestamp()
				.setFooter({
					text: '©2025 copper',
					iconURL: 'https://i.imgur.com/StODuzm.png'
				});

			await interaction.reply({
				embeds: [exampleEmbed]
			});

			return; // Stop execution after fail message
		}

		// Amount earned for successful beg
		const earned = getRandomInt(699);

		// Add coins to user's balance
		user.balance += earned;

		// Success message
		const exampleEmbed = new EmbedBuilder()
			.setColor(0xDE8050)
			.setTitle(`you earned ${earned} ${emojis.coin}!`)
			.addFields({
   				name: ' ',
    			value: dialogue.beg.successful[Math.floor(Math.random() * dialogue.beg.successful.length)]
			})
			.setTimestamp()
			.setFooter({
				text: '©2025 copper',
				iconURL: 'https://i.imgur.com/StODuzm.png'
			});

		await interaction.reply({ embeds: [exampleEmbed] });

		// Apply new cooldown (10 seconds)
		user.cooldowns.set("beg", now + 60);

		// Save updated user data
		await user.save();
	},
};
