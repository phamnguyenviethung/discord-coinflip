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

      let reportCostText = "";

      require.forEach((reqItem) => {
        reportCostText += `**${reqItem.name}**: ${reqItem.amount}\n`;

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
          `Bạn không có đủ đồ.\nYêu cầu tối thiểu:\n${reportCostText}`
        );
      }
      const update = {
        ...user.inventory,
      };

      validItem.forEach((item) => {
        update[item.name] = user.inventory[item.name] -= item.amount;
      });

      let resultText = "";

      result.forEach((item) => {
        resultText =
          result.length === 1
            ? `**${item.amount} ${item.name}**`
            : `**${item.name}**: ${item.amount}\n`;
        update[item.name] = user.inventory[item.name] += item.amount;
      });

      await User.findOneAndUpdate(
        { id: interaction.user.id },
        { inventory: update }
      );

      interaction.user.send(`Bạn nhận được \n${resultText}`);

      return interaction.reply(
        `Craft thành công. Bạn đã tiêu tốn:\n${reportCostText}`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("craft: có lỗi");
    }
  },
};
