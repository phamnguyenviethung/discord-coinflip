require("dotenv").config();
const { Client, Intents } = require("discord.js");
const db = require("./configs/db.js");

// Server config
db.connect();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("message", (message) => {
  if (message.content === "Hi guys") {
    message.channel.send("Hi, tớ là bot của Hưng!"); //message.reply('Pong!'); Also If You Want The BOT To Ping The Person Who Used The Command
  }
});

// Login to Discord with your client's token

client.login(process.env.TOKEN);
