const User = require("../../app/models/User");

module.exports = {
  name: "cash",
  description: "Xem số tiền bạn đang có!",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    console.log(interaction);
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const formatMoney = user.money.toLocaleString("en-US");

      return interaction.reply(
        ` Số coin ${interaction.user.username} đang có là: **${formatMoney}** `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Có lỗi !!");
    }
  },
};
