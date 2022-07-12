const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const _ = require("underscore");

dayjs.extend(relativeTime);
require("dayjs/locale/vi");
module.exports = {
  name: "chayan",
  description: "chạy án",
  type: "CHAT_INPUT",
  cooldown: 30,

  run: async (client, interaction, user) => {
    try {
      if (user.money < 10000000) {
        return interaction.reply(
          "Bạn không đủ tiền để chạy án. **Tối thiểu là 10 triệu**"
        );
      }
      const roll = _.random(1, 30) >= 15;

      const now = dayjs().locale("vi");
      const userTime = dayjs(user.timestamps.jail);

      const isBefore = now.isBefore(userTime, "DD/MM/YYYY H:mm:ss");
      if (isBefore) {
        if (roll) {
          user.timestamps.jail = userTime.add(3, "minute");
          user.bankloan += 80000000;
          user.save();
          return interaction.reply(
            `Thất bại, bạn bị phạt thêm 3 phút và trả 8 triệu tiền chạy án`
          );
        } else {
          user.timestamps.jail = null;
          user.bankloan += 20000000;
          user.save();
          return interaction.reply(`Bạn đã trốn thành công`);
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
