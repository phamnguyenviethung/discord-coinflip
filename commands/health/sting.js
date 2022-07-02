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

      if (user.health.drink >= 200) {
        return interaction.reply(` Bạn không khát nước.`);
      }

      if (user.job === "water") {
        if (user.storage.water.volume <= 0) {
          return interaction.reply({
            content: "Bạn không đủ hàng để bán. Hãy đi chế tạo",
            ephemeral: true,
          });
        }

        user.storage.water.volume -= 1;
        user.inventory.plastic -= 6;
        user.inventory.tape -= 2;
        user.inventory.cloth -= 5;
        user.health.drink += 40;
        user.save();

        return interaction.reply(
          `${interaction.user.username} vừa uống  1 chai **sting**`
        );
      }

      if (user.inventory.sting <= 0) {
        return interaction.reply(` Bạn không có`);
      }

      user.inventory.plastic -= 6;
      user.inventory.tape -= 2;
      user.inventory.cloth -= 5;
      user.health.drink += 40;

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
