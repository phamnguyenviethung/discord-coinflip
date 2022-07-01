const Craft = require("../../app/models/Craft");
const User = require("../../app/models/User");
const { formatMoney } = require("../../utils/format");

module.exports = {
  name: "craft",
  description: "Chế tạo đồ",
  type: "CHAT_INPUT",
  options: [
    {
      name: "code",
      description: "Code",
      required: true,
      type: "STRING",
    },
  ],

  run: async (client, interaction) => {
    const code = interaction.options.get("code").value;
    try {
      const user = await User.findOne({ id: interaction.user.id });
      const craftItem = await Craft.findOne({ code, isWorking: true });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      if (!craftItem) return interaction.reply("Sai code hoặc không tồn tại");

      const require = craftItem.require;
      const result = craftItem.result;
      const validItem = [];

      let notEnoughText = "";

      require.forEach((reqItem) => {
        notEnoughText += `**${reqItem.name}**: ${reqItem.amount}\n`;

        if (
          user.inventory[reqItem.name] !== undefined &&
          user.inventory[reqItem.name] > reqItem.amount &&
          user.inventory[reqItem.name] > 0
        ) {
          validItem.push(reqItem);
        }
      });

      if (validItem.length !== require.length) {
        return interaction.reply(
          `Bạn không có đủ đồ.\nYêu cầu tối thiểu:\n${notEnoughText}`
        );
      }
      const update = {
        ...user.inventory,
      };

      validItem.forEach((item) => {
        update[item.name] = user.inventory[item.name] -= item.amount;
      });

      result.forEach((item) => {
        update[item.name] = user.inventory[item.name] += item.amount;
      });

      await User.findOneAndUpdate(
        { id: interaction.user.id },
        { inventory: update }
      );
      console.log(update);
      return interaction.reply(`Craft thành công`);
    } catch (error) {
      console.log(error);
      return interaction.reply("craft: có lỗi");
    }
  },
};
