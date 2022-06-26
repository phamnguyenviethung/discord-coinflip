const User = require("../../app/models/User");
module.exports = {
  name: "register",
  description: "Đăng ký chơi Coinflip",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      const isUserExit = await User.findOne({ id: interaction.user.id });
      if (isUserExit) return interaction.reply("Bạn đã đăng ký rồi");

      await User.create({ id: interaction.user.id });
      return interaction.reply("Đăng ký thành công");
    } catch (error) {
      console.log(error);
      return interaction.reply("Có lỗi !!");
    }
  },
};
