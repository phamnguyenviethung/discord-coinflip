const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");
const { category } = require("../../utils/category");
const _ = require("underscore");
const dayjs = require("dayjs");
require("dayjs/locale/vi");

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
  cooldown: 0,
  options: [
    {
      name: "animal",
      description: "Chọn loại cần buôn",
      required: true,
      type: "STRING",
      choices,
    },
    {
      name: "amount",
      description: "Nhập số lượng",
      required: true,
      type: "NUMBER",
      min_value: 1,
    },
  ],

  run: async (client, interaction, user) => {
    const require = {
      rabbit: _.random(5000, 15000),
      tiger: _.random(20000, 50000),
      rhino: _.random(90000, 200000),
    };
    const animal = interaction.options.get("animal").value;
    const amount = interaction.options.get("amount").value;
    try {
      if (user.health.eat < 100 || user.health < 100) {
        client.cooldowns.get("smuggle").delete(interaction.user.id);
        return interaction.reply(
          `Bạn đã kiệt sức. Để tiếp tục làm việc, bạn cần có ít nhất **100 eat và 100 drink**`
        );
      }

      if (
        user.inventory.hunting[animal] < amount ||
        user.inventory.hunting[animal] <= 0
      )
        return interaction.reply(`Cần tối thiểu **1 con** để buôn`);

      const pick = _.random(1, 10);
      const gift = amount * require[animal];
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
        user.inventory.hunting[animal] -= amount;
        user.health.drink -= 30;
        user.health.eat -= 50;
        user.save();

        interaction.channel.send(
          `💸 Giao dịch thành công. Bạn nhận được **${formatMoney(gift)}**`
        );
      } else {
        const time = dayjs().locale("vi").add(5, "minutes");
        user.health.drink -= 30;
        user.health.eat -= 50;
        user.inventory.hunting[animal] -= amount;
        user.timestamps.jail = time.valueOf();
        user.save();
        interaction.channel.send(
          `🚓🚓🚓 Giao dịch thất bại. Bạn đã bị bắt. Bạn bị giam **5 phút**`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("smuggle: có lỗi");
    }
  },
};
