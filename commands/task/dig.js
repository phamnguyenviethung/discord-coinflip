const User = require("../../app/models/User");
const _ = require("underscore");
const { random } = require("chance-percent");

module.exports = {
  name: "dig",
  description: "Cùng nhau dig nào ",
  cooldown: 30,
  type: "CHAT_INPUT",
  run: async (client, interaction) => {
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      if (user.health.eat < 10 || user.health.drink < 5) {
        client.cooldowns.get("dig").delete(interaction.user.id);
        return interaction.reply("Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }

      const randomQuantity = _.random(1, 10);

      // Plastic - Cloth - Tape - Iron - Wire
      const options = [
        { value: "plastic", percentage: 35 },
        { value: "cloth", percentage: 30 },
        { value: "tape", percentage: 20 },
        { value: "iron", percentage: 14 },
        { value: "wire", percentage: 1 },
      ];
      const randomItem = random(options);
      user.health.eat -= 3;
      user.health.drink -= 3;

      user.inventory[randomItem] += randomQuantity;
      user.save();
      return interaction.reply(
        `**${interaction.user.username}** đã đào được **${randomQuantity} ${randomItem}**`
      );

      // if (randomQuantity <= 7) {
      //   const quantity = _.random(2, 4);
      //   user.inventory.plastic += quantity;

      //   user.save();
      //   return interaction.reply(
      //     `**${interaction.user.username}** đã đào được **${quantity} nhựa**`
      //   );
      // } else {
      //   const quantity = _.random(1, 3);
      //   user.inventory.iron += quantity;
      //   user.save();
      //   return interaction.reply(
      //     `**${interaction.user.username}** đã đào được **${quantity} sắt**`
      //   );
      // }
    } catch (error) {
      console.log(error);
      return interaction.reply("Dig: Có lỗi !!");
    }
  },
};
