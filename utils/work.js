// const User = require("../../app/models/User");

// module.exports = {
//   name: "work",
//   description: "Cùng nhau quậch nào ",
//   cooldown: 302,
//   type: "CHAT_INPUT",
//   run: async (client, interaction) => {
//     try {
//       const user = await User.findOne({ id: interaction.user.id });
//       if (!user) return interaction.reply("Bạn chưa đăng ký");

//       return interaction.reply("Work thành công");
//     } catch (error) {
//       console.log(error);
//       return interaction.reply("Có lỗi !!");
//     }
//   },
// };
