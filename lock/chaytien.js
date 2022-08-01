const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const _ = require("underscore");
const { formatMoney } = require("../utils/format");

dayjs.extend(relativeTime);
require("dayjs/locale/vi");
module.exports = {
  name: "chayan",
  description: "chạy án",
  type: "CHAT_INPUT",
  cooldown: 3 * 60,

  run: async (client, interaction, user) => {
    try {
      if (user.atm < 10000000000) {
        return interaction.reply(
          "Bạn không đủ tiền để chạy án. **Tối thiểu là 10 tỷ**"
        );
      }
      const roll = _.random(1, 30) >= 15;

      const now = dayjs().locale("vi");
      const userTime = dayjs(user.timestamps.jail);

      const isBefore = now.isBefore(userTime, "DD/MM/YYYY H:mm:ss");
      if (isBefore) {
        if (roll) {
          const fine = 1000000 * 5000;
          user.timestamps.jail = userTime.add(5, "minute");
          user.atm -= fine;

          user.save();
          return interaction.reply(
            `Bạn chi **${formatMoney(
              fine
            )}** để chạy nhưng thất bại. Bạn bị phạt thêm **5 phút**`
          );
        } else {
          const pick = _.random(1, 10) >= 4;

          if (pick) {
            const fine = 1000000 * 8000;
            user.timestamps.jail = userTime.subtract(3, "minutes");
            user.atm -= fine;
            user.save();
            return interaction.reply(
              `Bạn được giảm nhẹ tội: **giảm 3 phút** tiền án\n Số tiền phải chi là **${formatMoney(
                fine
              )}**`
            );
          } else {
            const fine = 1000000 * 10000;
            user.timestamps.jail = null;
            user.atm -= fine;
            user.save();
            return interaction.reply(
              `Bạn được thoát sạch tội.\nSố tiền phải chi là **${formatMoney(
                fine
              )}**`
            );
          }
        }
      } else {
        return interaction.reply(`Bạn không trong tù`);
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("chayan: có lỗi");
    }
  },
};
