require("dotenv").config();
const db = require("./configs/db.js");
db.connect();

const { Client, Intents, Collection } = require("discord.js");
// Create a new client instance
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.commands = new Collection();
client.categories = new Collection();
client.interactions = new Collection();
client.cooldowns = new Collection();

["commands", "events"].forEach((handler) =>
  require(`./handlers/${handler}`)(client)
);

client.login(process.env.TOKEN);
