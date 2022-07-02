const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "gas",
  description: "Ăn gì đó đê!!!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "amount",
      description: "Số lượng bạn muốn mua",
      type: "NUMBER",
      required: true,
      min_value: 1,
      max_value: 99,
    },
  ],

  run: async (client, interaction) => {
    const price = 3500;
    const amount = interaction.options.get("amount").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.inventory.gas >= 100) {
        return interaction.reply(`Bạn đã có 100 cái rồi.`);
      }
      if (user.money < price * amount) {
        return interaction.reply(
          `Bạn không đủ tiền để mua ${amount} cái. Giá bán hiện là **${formatMoney(
            price
          )}/cái**`
        );
      }

      user.inventory.gas += amount;
      user.money -= price * amount;
      user.save();

      return interaction.reply(
        `**${
          interaction.user.username
        }** vừa mua ${amount} bình gas với giá **${formatMoney(
          price * amount
        )}** 🧨`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("gas: có lỗi");
    }
  },
};
