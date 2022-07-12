const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
module.exports = {
  name: "flipall",
  description: "Cùng all in nào các chiến binh",
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
  ],
  run: async (client, interaction, user) => {
    try {
      const userSide = interaction.options.get("side").value;
      const pick = _.random(1, 30) <= 15 ? "Heads" : "Tails";
      const jail = _.random(100, 200) < 130;
      const bet = user.money;

      if (user.health.eat < 25 || user.health.drink < 20) {
        return interaction.reply("😫 Bạn đã kiệt sức. Hãy đi ăn uống gì đó");
      }
      if (user.money <= 0) {
        return interaction.reply(` Bạn không đủ tiền! =))`);
      }

      interaction.reply(
        `**${interaction.user.username}** đã all in **${formatMoney(
          user.money
        )}** vào **${userSide}** 🙅‍♂️🙅‍♂️🙅‍♂️`
      );
      if (bet > 200000) {
        if (userSide !== pick) {
          user.money = 0;
          user.save();

          await new Promise((resolve) => {
            setTimeout(resolve, 3200);
          });
          await interaction.channel.send(
            `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
          );
        } else {
          const gift = bet >= 3000000 ? 4 : 2;

          user.money *= gift;
          user.health.eat -= 10;
          user.health.drink -= 10;
          user.save();

          await new Promise((resolve) => {
            setTimeout(resolve, 3200);
          });
          await interaction.channel.send(
            `🎉🎉🎉 Kết quả là **${pick}**. Chúc mừng bạn đã thắng, bạn ăn được \`${formatMoney(
              bet * gift
            )}\` `
          );
        }
        console.log("flipall:", jail);
        if (jail) {
          if (bet <= 1000000) {
            const fine = 700000;
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
            const fine = _.random(5, 15) * 1000000;
            user.bankloan += fine;
            user.timestamps.jail = time.valueOf();
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
          user.money = 0;
          user.save();

          await new Promise((resolve) => {
            setTimeout(resolve, 3200);
          });
          return await interaction.channel.send(
            `🚑🚑🚑 Kết quả là **${pick}**. Bạn đã mất hết tiền cược.`
          );
        }
        const gift = bet >= 3000000 ? 4 : 2;

        user.money *= gift;
        user.health.eat -= 4;
        user.health.drink -= 4;
        user.save();

        await new Promise((resolve) => {
          setTimeout(resolve, 3200);
        });
        return await interaction.channel.send(
          `🎉🎉🎉 Kết quả là **${pick}**. Chúc mừng bạn đã thắng, bạn ăn được \`${formatMoney(
            bet * gift
          )}\` `
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.channel.send("Flipall: Có lỗi");
    }
  },
};
