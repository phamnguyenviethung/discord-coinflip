const User = require("../../app/models/User");

module.exports = {
  name: "get",
  description: "Húp tiền free",
  type: "CHAT_INPUT",
  cooldown: 1,
  run: async (client, interaction) => {
    try {
      // const user = await User.findOne({ id: interaction.user.id });
      // if (!user) return interaction.reply("Bạn chưa đăng ký");

      // user.money += 678910;
      // user.save();

      return interaction.reply(` Chức năng đã đóng `);
    } catch (error) {
      console.log(error);
      return interaction.reply("Get: Có lỗi !!");
    }
  },
};
