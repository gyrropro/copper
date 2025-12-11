const { SlashCommandBuilder, EmbedBuilder, InteractionContextType } = require('discord.js');
const UserModel = require('../../schema/User.js');
const emojis = require('../../jsons/emojis.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('give')
		.setDescription('Gives user your coins')
		.setContexts(InteractionContextType.Guild, InteractionContextType.PrivateChannel, InteractionContextType.BotDM)
        .addUserOption(option =>
			option
				.setName('user')
				.setDescription('User to send coins to')
				.setRequired(true)
	    )
        .addIntegerOption(option =>
			option
				.setName('amount')
				.setDescription('Amount of coins to send')
				.setRequired(true)
        ),

	async execute(interaction) {

        const target = interaction.options.getUser('user');

        if (target.bot) {
            const botEmbed = new EmbedBuilder()
                .setColor(0xDE8050)
                .setTitle('You cannot give coins to a bot.')
                .setTimestamp()
                .setFooter({
                    text: '©2025 copper',
                    iconURL: 'https://i.imgur.com/StODuzm.png'
                });

            await interaction.reply({ embeds: [botEmbed], flags: 64 });
            return;
        }

        // Load or create sender
        let sender = await UserModel.findById(interaction.user.id);
        if (!sender) sender = await UserModel.create({ _id: interaction.user.id });

        // Load or create receiver
        let receiver = await UserModel.findById(target.id);
        if (!receiver) receiver = await UserModel.create({ _id: target.id });

        const amount = interaction.options.getInteger('amount');

        // Sender must have enough coins
        if (amount > sender.balance) {
            const embed = new EmbedBuilder()
                .setColor(0xDE8050)
                .setTitle(`You cannot give more than what you have.`)
                .setTimestamp()
                .setFooter({
                    text: '©2025 copper',
                    iconURL: 'https://i.imgur.com/StODuzm.png'
                });

            await interaction.reply({ embeds: [embed], flags: 64 });
            return;
        }

        if (receiver == sender) {
            const embed = new EmbedBuilder()
                .setColor(0xDE8050)
                .setTitle(`You cannot send yourself coins`)
                .setTimestamp()
                .setFooter({
                    text: '©2025 copper',
                    iconURL: 'https://i.imgur.com/StODuzm.png'
                });

            await interaction.reply({ embeds: [embed], flags: 64 });
            return;
        }

        // Balance update
        sender.balance -= amount;
        receiver.balance += amount;

        await sender.save();
        await receiver.save();

        // Confirmation embed to sender
        const embed = new EmbedBuilder()
            .setColor(0xDE8050)
            .setTitle(`You sent ${amount} ${emojis.coin} to ${target.username}!`)
            .setTimestamp()
            .setFooter({
                text: '©2025 copper',
                iconURL: 'https://i.imgur.com/StODuzm.png'
            });

        await interaction.reply({ embeds: [embed], flags: 64 });

        // DM embed to target
        const dmEmbed = new EmbedBuilder()
            .setColor(0xDE8050)
            .setTitle(`${interaction.user.username} sent you ${amount} ${emojis.coin}`)
            .setTimestamp()
            .setFooter({
                text: '©2025 copper',
                iconURL: 'https://i.imgur.com/StODuzm.png'
            });

        try {
            await target.send({ embeds: [dmEmbed] });   // FIXED
        } catch (err) {
            console.log("DM failed:", err);
        }
	},
};
