const User = require("../../app/models/User");

module.exports = {
  name: "register",
  category: "user",
  run: async (client, message, args) => {
    try {
      const isUserExit = await User.findOne({ id: message.author.id });
      if (isUserExit) return message.reply("Bạn đã đăng ký rồi");

      await User.create({ id: message.author.id });
      return message.reply("Đăng ký thành công");
    } catch (error) {
      console.log(error);
      return message.reply("Có lỗi !!");
    }
  },
};
