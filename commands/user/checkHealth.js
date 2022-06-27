const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "health",
  description: "Kiếm tra sức khỏe",
  type: "CHAT_INPUT",

  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      return interaction.reply(
        `Food: **${user.health.eat}** // Water: **${user.health.drink}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("checkHealth: có lỗi");
    }
  },
};
