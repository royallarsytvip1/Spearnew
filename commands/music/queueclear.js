const LenoxCommand = require('../LenoxCommand.js');

module.exports = class queueclearCommand extends LenoxCommand {
	constructor(client) {
		super(client, {
			name: 'queueclear',
			group: 'music',
			memberName: 'queueclear',
			description: 'Clears the whole music queue',
			format: 'queueclear',
			aliases: [],
			examples: ['queueclear'],
			clientPermissions: ['SEND_MESSAGES'],
			userPermissions: ['MANAGE_GUILD'],
			shortDescription: 'Queue',
			dashboardsettings: true
		});
	}

	run(msg) {
		const langSet = msg.client.provider.getGuild(msg.message.guild.id, 'language');
		const lang = require(`../../languages/${langSet}.json`);

		const queue = msg.client.queue;
		const serverQueue = queue.get(msg.guild.id);

		if (!serverQueue || serverQueue.songs.length === 1) return msg.channel.send(lang.queueclear_queueempty);

		const newArray = serverQueue.songs.slice(1, serverQueue.songs.length);
		serverQueue.songs = newArray;
		return msg.reply(lang.queueclear_done);
	}
};
