const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "bank",
  description: "Chuyển tiền cho người khác!",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn chuyền tiền",
      type: "USER",
      required: true,
    },
    {
      name: "amount",
      description: "Số tiền bạn muốn chuyền",
      type: "INTEGER",
      required: true,
      min_value: 0,
    },
  ],
  run: async (client, interaction) => {
    const { value } = interaction.options.get("amount");
    const { id, username } = interaction.options.getUser("user");
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const payee = await User.findOne({ id });
      if (!payee)
        return interaction.reply("Người nhận không đúng hoặc chưa đăng ký");
      if (user.id === payee.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }
      if (user.money <= 0 || user.money < value) {
        return interaction.reply("Bạn không đủ tiền! :(");
      }
      user.money -= value;
      payee.money += value;
      user.save();
      payee.save();

      return interaction.reply(
        `🤑 **${interaction.user.username}** đã chuyển **${formatMoney(
          value
        )}** cho **${username}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Give: Có lỗi !!");
    }
  },
};
