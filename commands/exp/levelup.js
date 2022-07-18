const { job } = require("../../configs/jobConfig");
const levelConfig = require("../../configs/levelConfig");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "levelup",
  description: "Up level",
  type: "CHAT_INPUT",
  run: async (client, interaction, user) => {
    const { level, amount } = user.profile.exp;
    const maxLevel = Object.keys(job).length;

    let userJobRequireExp;
    Object.keys(job).forEach((item) => {
      if (job[item].level === level) userJobRequireExp = job[item].exp;
    });
    try {
      if (level === 1) {
        if (amount < userJobRequireExp) {
          return interaction.reply(
            `Bạn không đủ EXP. Bạn cần **${
              userJobRequireExp - amount
            }** EXP để level up`
          );
        }

        if (user.money < 150 * 1000) {
          return interaction.reply(
            `Bạn không đủ tiền. Bạn cần 150k để level up`
          );
        }

        const gift = 10 * 1000;
        user.profile.exp.amount = 0;
        user.profile.exp.level = nextLevel;
        user.money += gift;
        user.save();
        return interaction.reply(
          `Bạn đã level up thành công! Bạn được hỗ trợ ${formatMoney(gift)}`
        );
      } else {
        if (level >= maxLevel) {
          return interaction.reply("Bạn đã đạt level cao nhất");
        }

        const nextLevel = level + 1;
        let text = "";
        let isValid = true;
        Object.keys(levelConfig).forEach((item) => {
          if (job[item].level === level) {
            Object.keys(levelConfig[item].req).forEach((key) => {
              const formatKey = key.charAt(0).toUpperCase() + key.slice(1);
              text += `+ **${formatKey}**: ${levelConfig[item].req[key]}\n`;
              if (
                user.inventory[levelConfig[item].category][key] <
                levelConfig[item].req[key]
              ) {
                isValid = false;
              }
            });
          }
        });
        if (!isValid) {
          return interaction.reply(
            `**Bạn không đủ điều kiện.**\nYêu cầu tối thiểu:\n${text}`
          );
        }

        if (amount < userJobRequireExp) {
          return interaction.reply(
            `Bạn không đủ EXP. Bạn cần **${
              userJobRequireExp - amount
            }** EXP để level up`
          );
        }

        const gift = 10 * 1000;
        user.profile.exp.amount = 0;
        user.profile.exp.level = nextLevel;
        user.money += gift;
        user.save();
        return interaction.reply(
          `Bạn đã level up thành công! Bạn được hỗ trợ ${formatMoney(gift)}`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("levelup: có lỗi");
    }
  },
};
