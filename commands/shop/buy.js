const { formatMoney } = require("../../utils/format");
const shopPrice = require("../../configs/shopConfig");

const choices = [];
["sting", "coffee", "beer", "bread", "hamburger"].forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});

module.exports = {
  name: "buy",
  description: "Mua sắm",
  type: "CHAT_INPUT",
  cooldown: 10,
  options: [
    {
      name: "item",
      description: "Item bạn muốn mua",
      type: "STRING",
      required: true,
      choices,
    },
    {
      name: "amount",
      description: "Số lượng bạn muốn mua",
      type: "INTEGER",
      required: true,
      min_value: 1,
      max_value: 25,
    },
  ],

  run: async (client, interaction, user) => {
    const item = interaction.options.get("item").value;
    let amount = interaction.options.get("amount").value;

    try {
      if (user.item[item] >= 25) {
        return interaction.reply(`Bạn đã có 25 cái rồi.`);
      }
      if (user.item[item] + amount > 25) amount = 25 - user.item[item];
      if (user.money < shopPrice[item].price * amount) {
        return interaction.reply(
          `Bạn không đủ tiền để mua ${amount} cái. Giá bán hiện là ${formatMoney(
            shopPrice[item].price
          )}**/cái**`
        );
      }
      user.item[item] += amount;
      user.money -= shopPrice[item].price * amount;
      user.save();

      return interaction.reply(
        `**${
          interaction.user.username
        }** vừa mua ${amount} ${item} với giá **${formatMoney(
          shopPrice[item].price * amount
        )}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("buy: có lỗi");
    }
  },
};
