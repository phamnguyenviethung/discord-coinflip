const User = require("../../app/models/User");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "dig",
  description: "Cùng nhau dig nào ",
  cooldown: 20,
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      if (user.health.eat < 10 || user.health.drink < 5) {
        client.cooldowns.get("rob").delete(interaction.user.id);
        return interaction.reply("Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }

      const pick = _.random(1, 10);

      user.health.eat -= 2;
      user.health.drink -= 2;
      if (pick <= 5) {
        const quantity = _.random(3, 5);
        user.metal.plastic += quantity;

        user.save();
        return interaction.reply(
          `**${interaction.user.username}** đã đào được **${quantity} nhựa**`
        );
      } else {
        const quantity = _.random(1, 3);
        user.metal.iron += quantity;
        user.save();
        return interaction.reply(
          `**${interaction.user.username}** đã đào được **${quantity} sắt**`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("Dig: Có lỗi !!");
    }
  },
};
