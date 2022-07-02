const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");
const choices = [];
const alreadyHas = [];
Object.keys(category).forEach((key) => {
  category[key].forEach((item) => {
    if (!alreadyHas.includes(item)) {
      alreadyHas.push(item);
      choices.push({
        name: item,
        value: item,
      });
    }
  });
});

module.exports = {
  name: "give",
  description: "Ship đồ cho người khác!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn ship",
      type: "USER",
      required: true,
    },
    {
      name: "item",
      description: "Item muốn đưa",
      type: "STRING",
      choices,
      required: true,
    },
    {
      name: "amount",
      description: "Số lượng",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    const { value } = interaction.options.get("amount");
    const { id, username } = interaction.options.getUser("user");
    const itemName = interaction.options.get("item").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const payee = await User.findOne({ id });
      if (!payee)
        return interaction.reply("Người nhận không đúng hoặc chưa đăng ký");
      if (user.id === payee.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }

      if (user.inventory[itemName] <= 0 || user.inventory[itemName] < value) {
        return interaction.reply("Bạn không đủ để đưa");
      }
      user.inventory[itemName] -= value;
      payee.inventory[itemName] += value;
      user.save();
      payee.save();

      return interaction.reply(
        ` **${interaction.user.username}** đã đưa **${
          value + " " + itemName
        }** cho **${username}**. Bạn còn lại ${user.inventory[itemName]} cái`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Give: Có lỗi !!");
    }
  },
};
