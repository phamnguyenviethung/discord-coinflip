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
      max_value: 20,
    },
  ],

  run: async (client, interaction, user) => {
    if (
      user.inventory.weapon.knife <= 0 ||
      user.inventory.weapon.taser <= 0 ||
      user.inventory.tool.mask <= 0
    ) {
      return interaction.reply(
        "Bạn phải có ít nhất 1 **knife**, **mask** và **taser**"
      );
    }

    const require = {
      rabbit: _.random(50 * 1000000, 200 * 1000000),
      tiger: _.random(100 * 1000000, 500 * 1000000),
      rhino: _.random(700 * 1000000, 5000 * 1000000),
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
        user.inventory.weapon.taser -= 1;
        user.inventory.tool.mask -= 1;
        user.inventory.weapon.knife -= 1;

        user.save();

        interaction.channel.send(
          `💸 Giao dịch thành công. Bạn nhận được **${formatMoney(gift)}**`
        );
      } else {
        const time = dayjs().locale("vi").add(8, "minutes");
        user.health.drink -= 80;
        user.health.eat -= 50;
        user.inventory.hunting[animal] -= amount;
        user.timestamps.jail = time.valueOf();
        user.inventory.weapon.taser -= 1;
        user.inventory.tool.mask -= 1;
        user.inventory.weapon.knife -= 1;
        user.profile.jail += 1;
        user.save();
        interaction.channel.send(
          `🚓🚓🚓 Giao dịch thất bại. Bạn đã bị bắt. Bạn bị giam **8 phút**`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("smuggle: có lỗi");
    }
  },
};
