// const User = require("../../app/models/User");

// module.exports = {
//   name: "cash",
//   category: "money",
//   run: async (client, message, args) => {
//     try {
//       const user = await User.findOne({ id: message.author.id });
//       if (!user) return message.reply("Bạn chưa đăng ký");

//       return message.reply(
//         ` Số coin ${message.author.username} đang có là: **${user.money}** `
//       );
//     } catch (error) {
//       console.log(error);
//       return message.reply("Có lỗi !!");
//     }
//   },
// };
