const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const User = require("../../app/models/User");

dayjs.extend(relativeTime);
require("dayjs/locale/vi");
module.exports = {
  name: "rescue",
  description: "Giúp anh em vượt ngục",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "Người bạn muốn giúp",
      type: "USER",
      required: true,
    },
  ],

  run: async (client, interaction, user) => {
    try {
      const prisoner = await User.findOne({
        id: interaction.options.getUser("user").id,
      });
      if (!prisoner) {
        return interaction.reply("Người đó chưa đăng ký");
      }
      if (user.id === prisoner.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }

      if (user.inventory.weapon.shotgun <= 0) {
        return interaction.reply("Bạn không có shotgun");
      }

      const now = dayjs().locale("vi");
      const prionserTime = dayjs(prisoner.timestamps.jail);

      const isBefore = now.isBefore(prionserTime, "DD/MM/YYYY H:mm:ss");

      if (!isBefore) {
        return interaction.reply(`Người đó không trong tù`);
      }
      const pick = _.random(0, 10) >= 6;
      if (pick) {
        user.inventory.weapon.shotgun -= 1;
        user.save();
        prisoner.timestamps.jail = null;
        prisoner.save();
        return interaction.reply(`Một tù nhân vừa trốn thoát...`);
      } else {
        user.inventory.weapon.shotgun -= 1;
        user.timestamps.jail = now.add(5, "minute");
        user.save();
        return interaction.reply(
          `Thất bại, bạn phải chịu án chung với người đó`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("help: có lỗi");
    }
  },
};
