const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "sting",
  description: "Uống Sting",
  type: "CHAT_INPUT",

  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (user.inventory <= 0) {
        return interaction.reply(` Bạn không có`);
      }
      if (user.health.drink >= 500) {
        return interaction.reply(` Bạn không khát nước.`);
      }

      user.inventory.sting -= 1;
      user.health.drink += 30;
      user.save();

      return interaction.reply(
        `${interaction.user.username} vừa uống  1 chai **sting**`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("drink: có lỗi");
    }
  },
};
