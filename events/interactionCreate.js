const { Collection } = require("discord.js");
const dayjs = require("dayjs");
require("dayjs/locale/vi");
module.exports = (client, interaction) => {
  if (!interaction.isCommand()) return;
  const command = client.interactions.get(interaction.commandName);
  if (!command) interaction.reply("Lệnh không hợp lệ");
  if (!client.cooldowns.has(command.name))
    client.cooldowns.set(command.name, new Collection());

  // Permisson checker

  if (!interaction.member.permissions.has(command.permissions || [])) {
    return interaction.reply("Bạn không có quyền thực hiện lệnh này");
  }

  // cooldown
  const now = Date.now();
  const timestamps = client.cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 5) * 1000;
  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const dayjsTime = dayjs()
        .locale("vi")
        .add(timeLeft, "seconds")
        .format("H:mm:ss");
      return interaction.reply(
        `Vui lòng chờ để sử dụng. Bạn có thể quay lại sau **${timeLeft.toFixed(
          1
        )} giây**`
      );
    }
  }
  timestamps.set(interaction.user.id, now);
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
  command.run(client, interaction);
};
