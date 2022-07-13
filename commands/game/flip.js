const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
module.exports = {
  name: "flip",
  description: "Người không all in là người thất bại",
  type: "CHAT_INPUT",
  options: [
    {
      name: "side",
      description: "Chọn side",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Heads",
          value: "Heads",
        },
        {
          name: "Tails",
          value: "Tails",
        },
      ],
    },
    {
      name: "money",
      description: "Số tiền bạn muốn đặt",
      type: "INTEGER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction, user) => {
    const pick = _.random(1, 20) <= 10 ? "Heads" : "Tails";
    const userSide = interaction.options.get("side").value;
    const userMoneyBet = interaction.options.get("money").value;
    const jail = _.random(100) > 70;

    try {
      if (user.health.eat < 25 || user.health.drink < 20) {
        return interaction.reply("😫 Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money < userMoneyBet || user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }

      interaction.reply(
        `**${interaction.user.username}** đã cược \`${formatMoney(
          userMoneyBet
        )}\` vào **${userSide}**`
      );
      if (userMoneyBet > 200000) {
        if (userSide !== pick) {
          user.money -= userMoneyBet;
          user.save();
          await new Promise((resolve) => {
            setTimeout(resolve, 3200);
          });
          await interaction.channel.send(
            `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
          );
        } else {
          const multiply = 3;
          user.money += userMoneyBet * multiply;
          user.health.eat -= 10;
          user.health.drink -= 10;
          user.save();
          await new Promise((resolve) => {
            setTimeout(resolve, 3200);
          });
          await interaction.channel.send(
            `🎉🎉🎉 Kết quả là **${pick}**. Chúc mừng bạn đã thắng, bạn ăn được \`${formatMoney(
              userMoneyBet * multiply
            )}\` `
          );
        }

        console.log(jail);
        if (jail) {
          if (userMoneyBet < 1000000) {
            const fine = 1500000;
            user.bankloan += fine;

            user.save();
            return interaction.channel.send(
              `${interaction.user.username} đã bị phạt **${formatMoney(
                fine
              )}** vì đánh bạc sai quy định`
            );
          } else {
            const min = 10;
            const time = dayjs().locale("vi").add(min, "minutes");
            const fine = (userMoneyBet * 25) / 100;

            user.bankloan += fine;
            user.timestamps.jail = time.valueOf();
            user.profile.jail += 1;

            user.save();
            return interaction.channel.send(
              `🚓🚓🚓 **${
                interaction.user.username
              }** đã bị phạt **${formatMoney(
                fine
              )}** vì đánh bạc sai quy định và bị giam **${min} phút**`
            );
          }
        }
      } else {
        if (userSide !== pick) {
          user.money -= userMoneyBet;
          user.save();
          await new Promise((resolve) => {
            setTimeout(resolve, 3200);
          });
          return await interaction.channel.send(
            `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
          );
        }
        const multiply = 3;

        user.money += userMoneyBet * multiply;
        user.health.eat -= 10;
        user.health.drink -= 10;
        user.save();
        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          `🎉🎉🎉 Kết quả là **${pick}**. Chúc mừng bạn đã thắng, bạn ăn được \`${formatMoney(
            userMoneyBet * multiply
          )}\` `
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("Flip:Có lỗi !!");
    }
  },
};
