const User = require("../../app/models/User");
const { choicesGenerator } = require("../../utils/choicesGenerator");

module.exports = {
  name: "give2",
  description: "Đưa đồ cho người khác!",
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
      choices: choicesGenerator([
        "sting",
        "coffee",
        "beer",
        "bread",
        "hamburger",
        "rice",
        "noodle",
      ]),
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
  run: async (client, interaction, user) => {
    const { value } = interaction.options.get("amount");
    const { id, username } = interaction.options.getUser("user");
    const itemName = interaction.options.get("item").value;

    try {
      const payee = await User.findOne({ id });
      if (!payee)
        return interaction.reply("Người nhận không đúng hoặc chưa đăng ký");
      if (user.id === payee.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }

      if (!user.item[itemName] || user.item[itemName] < value) {
        return interaction.reply("Bạn không có đủ đồ");
      }

      user.item[itemName] -= value;
      payee.item[itemName] += value;
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
