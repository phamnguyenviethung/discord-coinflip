const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

const choices = [];
["fishingrod", "shovel", "huntingrifle"].forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});

module.exports = {
  name: "shopping",
  description: "Mua sắm đêee",
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
      max_value: 20,
    },
  ],

  run: async (client, interaction) => {
    const price = {
      shovel: 50000,
      fishingrod: 50000,
      huntingrifle: 50000,
    };
    const item = interaction.options.get("item").value;
    const amount = interaction.options.get("amount").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.inventory.tool[item] >= 20) {
        return interaction.reply(`Bạn đã có 20 cái rồi.`);
      }
      if (user.atm < price[item] * amount) {
        return interaction.reply(
          `Bạn không đủ tiền để mua ${amount} cái. Giá bán hiện là **${formatMoney(
            price[item]
          )}/cái**`
        );
      }
      user.inventory.tool[item] += amount;
      user.atm -= price[item] * amount;
      user.save();

      return interaction.reply(
        `**${
          interaction.user.username
        }** vừa mua ${amount} ${item} với giá **${formatMoney(
          price[item] * amount
        )}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("gas: có lỗi");
    }
  },
};
