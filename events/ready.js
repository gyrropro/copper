const { Events } = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true, // Run only once when the client becomes ready

	execute(client) {
		// Log to console that the bot is online and ready
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};
