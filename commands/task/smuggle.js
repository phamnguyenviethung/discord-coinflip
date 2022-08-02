const { choicesGenerator } = require("../../utils/choicesGenerator");
const { formatMoney } = require("../../utils/format");
const _ = require("underscore");
const dayjs = require("dayjs");
require("dayjs/locale/vi");

module.exports = {
  name: "smuggle",
  description: "Buôn lậu",
  type: "CHAT_INPUT",
  cooldown: 5,
  options: [
    {
      name: "animal",
      description: "Chọn loại cần buôn",
      required: true,
      type: "STRING",
      choices: choicesGenerator([
        "rabbit",
        "bird",
        "tiger",
        "rhino",
        "elephant",
      ]),
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
    if (user.inventory.weapon.shotgun <= 0 || user.inventory.tool.mask <= 0) {
      return interaction.reply(
        "Bạn phải có ít nhất 1  **mask** và **shotgun**"
      );
    }

    // Bird: 200tr - 300tr
    // Rabbit: 400tr - 600tr
    // Tiger: 2ty - 5ty
    // Rhino: 10ty - 60ty
    // elephant: 80ty - 400ty
    const prize = {
      bird: _.random(200 * 1000000, 300 * 1000000),
      rabbit: _.random(400 * 1000000, 600 * 1000000),
      tiger: _.random(2 * 1000000000, 5 * 1000000000),
      rhino: _.random(10 * 1000000000, 60 * 1000000000),
      elephant: _.random(80 * 1000000000, 400 * 1000000000),
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
        return interaction.reply(`Bạn không có đủ **${amount} ${animal}**`);

      const pick = _.random(1, 100);
      const gift = amount * prize[animal];
      interaction.reply(
        `🚙 🚙 🌬️ **${interaction.user.username}** đang đóng gói **${amount} ${animal}**`
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });

      interaction.channel.send(`💸💸💸 Bạn đang giao dịch...`);
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      if (pick <= 45) {
        user.money += gift;
        user.inventory.hunting[animal] -= amount;
        user.health.drink -= 80;
        user.health.eat -= 80;
        user.health.stress += 20;
        user.inventory.weapon.shotgun -= 1;
        user.inventory.tool.mask -= 1;

        user.save();

        interaction.channel.send(
          `💸 Giao dịch thành công. Bạn nhận được **${formatMoney(gift)}**`
        );
      } else {
        const lockTime = 15;
        const fine = 50 * 1000000;
        const volunteer = 8;
        const time = dayjs().locale("vi").add(lockTime, "minutes");

        user.health.drink -= 80;
        user.health.eat -= 80;
        user.health.stress += 50;

        user.inventory.hunting[animal] -= amount;
        user.inventory.weapon.shotgun -= 1;
        user.inventory.tool.mask -= 1;

        user.volunteer += volunteer;
        user.bankloan += fine;
        user.timestamps.jail = time.valueOf();
        user.profile.jail += 1;
        user.save();
        interaction.channel.send(
          `🚓🚓🚓 Giao dịch thất bại. Bạn đã bị phạt tù **${lockTime} phút**, **${volunteer} lần** lao động công ích và phạt ${formatMoney(
            fine
          )} `
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("smuggle: có lỗi");
    }
  },
};
