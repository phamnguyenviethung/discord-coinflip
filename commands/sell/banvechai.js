const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
module.exports = {
  name: "banvechai",
  description: "Bán ve chai",
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.channel.send("Bạn chưa đăng ký");
      const { plastic, iron } = user.metal;

      if (plastic === 0 && iron === 0) {
        return interaction.channel.send("Bạn không có để bán");
      }

      const price = {
        iron: 300,
        plastic: 250,
      };

      const sellprice = iron * price.iron + plastic * price.plastic;

      user.metal.iron = 0;
      user.metal.plastic = 0;
      user.money += sellprice;
      user.save();

      await new Promise((resolve) => {
        setTimeout(resolve, 1200);
      });
      return await interaction.reply(
        ` Bạn đã bán ve chai được **${formatMoney(sellprice)}**`
      );
    } catch (error) {
      console.log(error);
      return interaction.channel.send("banvechai: Có lỗi");
    }
  },
};
