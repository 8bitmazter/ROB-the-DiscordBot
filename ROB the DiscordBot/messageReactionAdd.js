module.exports = async (client, messageReaction, user) => {
    const message = messageReaction.message;
    const channel = message.guild.channels.find(c => c.name === 'welcome');
    const member = message.guild.members.get(user.id);
    if(member.user.bot) return;

    const a = message.guild.roles.get('rolenumbergoeshere');
}