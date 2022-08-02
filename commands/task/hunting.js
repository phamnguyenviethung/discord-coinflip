const _ = require("underscore");
const { random } = require("chance-percent");
const { formatMoney } = require("../../utils/format");
const dayjs = require("dayjs");
require("dayjs/locale/vi");

module.exports = {
  name: "hunting",
  description: "Săn thú",
  cooldown: 60,
  type: "CHAT_INPUT",
  run: async (client, interaction, user) => {
    const pick = _.random(1, 100) <= 10;
    const quantity = _.random(3, 6);
    const options = [
      { value: "bird", percentage: 30 },
      { value: "rabbit", percentage: 30 },
      { value: "tiger", percentage: 25 },
      { value: "empty", percentage: 9 },
      { value: "rhino", percentage: 5 },
      { value: "elephant", percentage: 1 },
    ];

    const item = random(options);

    try {
      const limit = 50;
      if (user.health.eat < limit || user.health.drink < limit) {
        client.cooldowns.get("hunting").delete(interaction.user.id);
        return interaction.reply(
          `Bạn đã kiệt sức. Cần tối thiểu **${limit} eat và drink**`
        );
      }

      if (user.inventory.tool.hunting <= 0) {
        return interaction.reply(
          `Bạn không có súng săn. Hãy dùng code **hrl** để craft`
        );
      }

      interaction.reply(`🚗🚗🚗 Bạn đang đi đến nơi săn...`);
      await new Promise((resolve) => {
        setTimeout(resolve, 4000);
      });
      if (pick) {
        const lockTime = 5;
        const fine = 10 * 1000000;
        const volunteer = 3;
        const time = dayjs().locale("vi").add(lockTime, "minutes");

        user.inventory.tool.hunting -= 1;
        user.health.eat -= 40;
        user.health.drink -= 40;
        user.health.stress = 90;
        user.timestamps.jail = time.valueOf();
        user.profile.jail += 1;
        user.bankloan += fine;
        user.volunteer += volunteer;
        user.save();

        return interaction.followUp(
          `${
            interaction.user.username
          } đã bị bắt vì hành vi săn bắt trái phép. Xử phạt **${lockTime} phút** tù, **${volunteer} lần** lao động công ích và phạt ${formatMoney(
            fine
          )}`
        );
      } else {
        user.inventory.tool.huntingrifle -= 1;
        user.health.eat -= 40;
        user.health.drink -= 40;
        user.health.stress += 5;
        user.inventory.hunting[item] += quantity;
        user.save();

        return interaction.followUp(
          `🕵️‍♂️🕵️‍♂️🕵️‍♂️ ${interaction.user.username} đã săn được **${quantity} ${item}**`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("hunting: Có lỗi !!");
    }
  },
};
