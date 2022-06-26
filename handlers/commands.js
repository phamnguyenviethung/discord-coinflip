const { readdirSync } = require("fs");
const slashCommands = [];
// const guildID = "853960757586821120";

module.exports = (client) => {
  let count = 0;
  readdirSync("./commands/").forEach((dir) => {
    const commands = readdirSync(`./commands/${dir}`).filter((file) =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const pull = require(`../commands/${dir}/${file}`);
      if (pull.name) {
        client.interactions.set(pull.name, pull);
        slashCommands.push(pull);
        count++;
      } else {
        continue;
      }
    }
  });

  client.once("ready", async () => {
    // await client.guilds.cache.get(guildID).commands.set(slashCommands);
    await client.application.commands.set(slashCommands);
  });

  console.log(`Đã load ${count} slash commands!`);
};
