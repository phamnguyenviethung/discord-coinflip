const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { formatMoney } = require("../../utils/format");
const blackjack = require("discord-blackjack");

module.exports = {
  name: "blackjack",
  description: "blackjack",
  type: "CHAT_INPUT",
  cooldown: 5,
  run: async (client, interaction, user) => {
    return blackjack(interaction);
  },
};
