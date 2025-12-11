const { Events, MessageFlags } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,

	async execute(interaction) {

		// Only handle slash/chat input commands
		if (!interaction.isChatInputCommand()) return;

		// Get the command from the client's command collection
		const command = interaction.client.commands.get(interaction.commandName);

		// Command not found
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			// Execute the command
			await command.execute(interaction);

		} catch (error) {
			console.error(error);

			// Handle errors: check if interaction has already been replied to or deferred
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral, // Only visible to the user
				});
			} else {
				await interaction.reply({
					content: 'There was an error while executing this command!',
					flags: MessageFlags.Ephemeral, // Only visible to the user
				});
			}
		}
	},
};
