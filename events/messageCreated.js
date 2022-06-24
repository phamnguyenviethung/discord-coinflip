module.exports = (client, messageCreate) => {
  if (messageCreate.author.bot) return;
  const prefix = "-";
  if (!messageCreate.content.startsWith(prefix)) return;
  const args = messageCreate.content.slice(prefix.length).trim().split(" ");
  const cmd = args.shift().toLowerCase();
  const command =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
  if (command) command.run(client, messageCreate, args);
};
