const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const _ = require("underscore");

dayjs.extend(relativeTime);
require("dayjs/locale/vi");
module.exports = {
  name: "chayan",
  description: "chạy án",
  type: "CHAT_INPUT",
  cooldown: 60,

  run: async (client, interaction, user) => {
    try {
      if (user.money < 40000000) {
        return interaction.reply(
          "Bạn không đủ tiền để chạy án. **Tối thiểu là 40 triệu**"
        );
      }
      const roll = _.random(1, 30) >= 15;

      const now = dayjs().locale("vi");
      const userTime = dayjs(user.timestamps.jail);

      const isBefore = now.isBefore(userTime, "DD/MM/YYYY H:mm:ss");
      if (isBefore) {
        if (roll) {
          user.timestamps.jail = userTime.add(5, "minute");
          user.money -= 150000000;

          user.save();
          return interaction.reply(
            `Thất bại, bạn bị phạt thêm 5 phút và trả 15 triệu tiền chạy án`
          );
        } else {
          user.timestamps.jail = userTime.subtract(2, "minutes");
          user.money -= 20000000;
          user.save();
          return interaction.reply(
            `Thật không may, bạn chỉ được giảm nhẹ tôi chứ không thoát được. Bạn trả 20 triệu tiền chạy án`
          );
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
