module.exports.reply = (interaction, message) => {
  interaction.reply(message);
};

module.exports.send = (interaction, message) => {
  interaction.channel.send(message);
};
