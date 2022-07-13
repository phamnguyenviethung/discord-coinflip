const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
const _ = require("underscore");
const { formatMoney } = require("../../utils/format");
const User = require("../../app/models/User");

dayjs.extend(relativeTime);
require("dayjs/locale/vi");
module.exports = {
  name: "report",
  description: "Giúp anh em vượt ngục",
  type: "CHAT_INPUT",
  cooldown: 120,
  options: [
    {
      name: "user",
      description: "Người bạn muốn tố",
      type: "USER",
      required: true,
    },
  ],

  run: async (client, interaction, user) => {
    const price = 800 * 1000000;
    const { id, username } = interaction.options.getUser("user");
    try {
      const prisoner = await User.findOne({
        id,
      });
      if (!prisoner) {
        return interaction.reply("Người đó chưa đăng ký");
      }
      if (user.id === prisoner.id) {
        return interaction.reply("Bạn không thể dùng lên chính mình");
      }

      if (user.money <= 0 || user < price) {
        return interaction.reply({
          content: "Bạn không đủ tiền",
          ephemeral: true,
        });
      }

      const now = dayjs().locale("vi");
      const prionserTime = dayjs(prisoner.timestamps.jail);

      const isBefore = now.isBefore(prionserTime, "DD/MM/YYYY H:mm:ss");

      if (!isBefore) {
        return interaction.reply({
          content: `Người đó không trong tù`,
          ephemeral: true,
        });
      }
      const pick = _.random(30, 40) <= 32;
      const min = _.random(3, 7);
      interaction.reply({
        content: "Tố cáo thành công",
        ephemeral: true,
      });
      await interaction.channel.send(
        `Một người ẩn danh đã tố cáo ${username}. Phiên tòa bắt đầu xét xử...`
      );
      await new Promise((resolve) => {
        setTimeout(resolve, 5000);
      });
      if (pick) {
        user.money -= price;
        user.save();
        prisoner.timestamps.jail = prisoner.timestamps.jail.add(min, "minutes");
        prisoner.save();
        return await interaction.channel.send(
          `Kết án: **${username}** có tội và phạt thêm **${min} phút**`
        );
      } else {
        user.money -= price;
        user.timestamps.jail = now.add(8, "minutes");
        user.save();
        prisoner.money += price * 1.5;
        prisoner.save();

        return await interaction.channel.send(
          `Kết án: **${username}** vô tội và được bồi thường **${formatMoney(
            price * 1.5
          )}**. Ngoài ra, ${
            interaction.user.username
          } bị phạt **8 phút** vì tội vu khống.`
        );
      }
    } catch (error) {
      console.log(error);
      return interaction.reply("help: có lỗi");
    }
  },
};
