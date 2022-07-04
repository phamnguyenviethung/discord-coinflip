const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");
const _ = require("underscore");
const choices = [];
category.smuggle.forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});

module.exports = {
  name: "smuggle",
  description: "Buôn lậu gì đó đi",
  type: "CHAT_INPUT",
  cooldown: 30,
  options: [
    {
      name: "animal",
      description: "Chọn loại cần buôn",
      required: true,
      type: "STRING",
      choices,
    },
  ],

  run: async (client, interaction) => {
    const require = {
      rabbit: {
        amount: 5,
        price: _.random(1000, 8000),
      },
      tiger: {
        amount: 3,
        price: _.random(10000, 30000),
      },
      rhino: {
        amount: 1,
        price: _.random(50000, 150000),
      },
    };
    const animal = interaction.options.get("animal").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");

      if (user.health.eat < 100 || user.health < 100) {
        client.cooldowns.get("smuggle").delete(interaction.user.id);
        return interaction.reply(
          `Bạn đã kiệt sức. Để tiếp tục làm việc, bạn cần có ít nhất **100 eat và 100 drink**`
        );
      }

      if (
        user.inventory[animal] < require[animal].amount &&
        user.inventory[animal] <= 0
      )
        return interaction.reply(
          `Cần tối thiểu **${require[animal].amount + " " + animal}** để buôn`
        );

      const pick = _.random(1, 10);
      const gift = require[animal].amount * require[animal].price;
      interaction.reply("🚙 🚙 🌬️ Bạn đang đến nơi giao dịch");
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });

      interaction.channel.send(`💸 Bạn đang giao dịch...`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });
      if (pick >= 4) {
        user.money += gift;
        user.inventory[animal] -= require[animal].amount;
        user.health.drink -= 30;
        user.health.eat -= 50;
        user.save();

        interaction.channel.send(
          `💸 Giao dịch thành công. Bạn nhận được **${formatMoney(gift)}**`
        );
      } else {
        user.health.drink -= 30;
        user.health.eat -= 50;
        user.save();
        interaction.channel.send(
          `🚓🚓🚓 Giao dịch thất bại. Rất may, bạn đã tẩu thoát thành công`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("smuggle: có lỗi");
    }
  },
};
