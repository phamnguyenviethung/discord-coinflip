const User = require("../app/models/User");
const { formatMoney } = require("../utils/format");
const { category } = require("../utils/category");
const choices = ["money"];
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
  name: "trade",
  description: "Trade đồ với người khác",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn trade",
      type: "USER",
      required: true,
    },
    {
      name: "uitem",
      description: "Đồ của bạn",
      type: "STRING",
      choices,
      required: true,
    },
    {
      name: "uamount",
      description: "Số lượng",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
    {
      name: "oitem",
      description: "Đồ của người khác",
      type: "STRING",
      choices,
      required: true,
    },
    {
      name: "oamount",
      description: "Số lượng",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction, user) => {
    const { id, username } = interaction.options.getUser("user");
    const { value: uamount } = interaction.options.get("uamount");
    const { value: iamount } = interaction.options.get("iamount");
    const uitem = interaction.options.get("uitem").value;
    const oitem = interaction.options.get("oitem").value;
    try {
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
        `🚚🚚🚚**${interaction.user.username}** đã gửi **${
          value + " " + itemName
        }** cho **${username}**.`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Give: Có lỗi !!");
    }
  },
};
