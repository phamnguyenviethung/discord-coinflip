require("dotenv").config();
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

["commands", "events"].forEach((handler) =>
  require(`./handlers/${handler}`)(client)
);

client.on("messageCreate", (messageCreate) => {
  if (messageCreate.content === "Hi guys") {
    messageCreate.channel.send("Hi, tớ là bot của Hưng!"); //message.reply('Pong!'); Also If You Want The BOT To Ping The Person Who Used The Command
  }
});

// Login to Discord with your client's token

client.login(process.env.TOKEN);
