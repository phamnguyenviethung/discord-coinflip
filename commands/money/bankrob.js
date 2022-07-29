const { formatMoney } = require("../../utils/format");
const _ = require("underscore");
const dayjs = require("dayjs");
require("dayjs/locale/vi");

module.exports = {
  name: "bankrob",
  description: "Cướp ngân hàng",
  type: "CHAT_INPUT",
  cooldown: 180,
  run: async (client, interaction, user) => {
    try {
      if (user.inventory.weapon.shotgun <= 0 || user.inventory.tool.mask <= 0) {
        return interaction.reply(
          "Bạn không đủ đồ nghề. Yêu cầu **shotgun và mask**"
        );
      }
      const success = _.random(1, 100) % 2 === 0;
      const money = _.random(10, 150) * 1000000000 + _.random(100, 5000) * 1.5;
      interaction.reply(`🚔🚔🚔 Một vụ cướp vừa xảy ra....`);
      await new Promise((resolve) => {
        setTimeout(resolve, 4000);
      });
      if (success) {
        user.money += money;
        user.inventory.weapon.shotgun -= 1;
        user.inventory.tool.mask -= 1;
        user.profile.rob.success += 1;
        user.save();
        return interaction.followUp(
          `🤑 **${interaction.user.username}** đã cướp được ${formatMoney(
            money
          )}`
        );
      } else {
        const lockTime = 6;
        const fine = 5 * 1000000;
        const volunteer = 10;
        const time = dayjs().locale("vi").add(lockTime, "minutes");

        user.timestamps.jail = time.valueOf();
        user.profile.jail += 1;
        user.profile.rob.fail += 1;
        user.bankloan += fine;
        user.volunteer += volunteer;
        user.inventory.weapon.shotgun -= 1;
        user.inventory.tool.mask -= 1;
        user.save();
        return interaction.followUp(
          `🚓 **${
            interaction.user.username
          }** đã cướp thất bại, bạn bị phạt ${formatMoney(
            fine
          )}, **${volunteer} lần** lao động công ích và phạt tù **${lockTime} phút**`
        );
      }
    } catch (error) {
      console.log(error);
      interaction.reply("Bankrob: Có lỗi !!");
    }
  },
};
