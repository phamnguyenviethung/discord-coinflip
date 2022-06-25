module.exports = {
  name: "ping",
  category: "info",
  aliases: ["p"],
  run: (client, message, args) => {
    message.reply(`Ping của server là: \`${client.ws.ping}ms\``);
  },
};
