const { Collection } = require("discord.js");
const User = require("../app/models/User");
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);
require("dayjs/locale/vi");

module.exports = async (client, interaction) => {
  try {
    if (!interaction.isCommand()) return;
    const command = client.interactions.get(interaction.commandName);
    if (!command) interaction.reply("Lệnh không hợp lệ");
    if (!client.cooldowns.has(command.name))
      client.cooldowns.set(command.name, new Collection());

    // Permisson checker

    if (
      (!interaction.member.permissions.has(command.permissions || []), false)
    ) {
      return interaction.reply("Bạn không có quyền thực hiện lệnh này");
    }

    // cooldown
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;
    if (timestamps.has(interaction.user.id)) {
      const expirationTime =
        timestamps.get(interaction.user.id) + cooldownAmount;

      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;

        return interaction.reply(
          `Vui lòng chờ để sử dụng. Bạn có thể quay lại sau **${timeLeft.toFixed(
            1
          )} giây**`
        );
      }
    }
    timestamps.set(interaction.user.id, now);
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

    const user = await User.findOne({ id: interaction.user.id });
    // user info checker
    if (command.name !== "register" && command.name !== "chayan") {
      if (!user) {
        timestamps.delete(interaction.user.id);
        return interaction.reply("Bạn chưa đăng ký");
      }

      const now = dayjs().locale("vi");
      const userTime = dayjs(user.timestamps.jail);

      const isBefore = now.isBefore(userTime, "DD/MM/YYYY H:mm:ss");

      if (isBefore) {
        return interaction.reply(
          `Bạn đang bị bắt. Bạn sẽ được tái hòa nhập cộng đồng sau **${now.to(
            userTime,
            true
          )}**`
        );
      }
    }

    if (["flip", "flipall"].includes(command.name)) {
      if (user.bankloan >= 10000000) {
        return interaction.reply(
          "Chủ sòng từ chối với người nợ ngân hàng trên **10 triệu đô**"
        );
      }
    }
    if (["flip", "flipall", "bankrob"].includes(command.name)) {
      if (user.volunteer > 0) {
        return interaction.reply(
          `Hãy hoàn thành lao động công ích trước khi làm việc khác. Bạn cần phải work **${user.volunteer} lần** nữa`
        );
      }
    }

    command.run(client, interaction, user);
  } catch (error) {
    console.log(error);
    return interaction.reply("IC: Có lỗi");
  }
};
