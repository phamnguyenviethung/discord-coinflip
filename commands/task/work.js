const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "work",
  description: "Cùng nhau quậch nào ",
  cooldown: 250,
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const gift = _.random(800, 8000);
      user.money += gift;
      user.save();
      return interaction.reply(
        `**${interaction.user.username}** đã kiếm được \`${formatMoney(gift)}\``
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("Work: Có lỗi !!");
    }
  },
};
