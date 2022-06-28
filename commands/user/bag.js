const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "bag",
  description: "Kiếm tra balo",
  type: "CHAT_INPUT",

  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      return interaction.reply(
        `Nhựa: **${user.metal.plastic}** // Sắt: **${user.metal.iron}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("bag: có lỗi");
    }
  },
};
