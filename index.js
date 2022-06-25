require("dotenv").config();
const fs = require("node:fs");
const _ = require("underscore");

const db = require("./configs/db.js");
db.connect();
const { Client, Intents, Collection } = require("discord.js");

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.aliases = new Collection();
client.categories = new Collection();
client.interactions = new Collection();

["commands", "events", "slashCommand"].forEach((handler) =>
  require(`./handlers/${handler}`)(client)
);

// client.on("messageCreate", (message) => {
//   if (message.content === "Hi guys") {
//     message.channel.send("Hi, tớ là bot của Hưng!");
//   }
// });

client.login(process.env.TOKEN);
