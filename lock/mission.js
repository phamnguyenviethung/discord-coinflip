const User = require("../app/models/User");
const { formatMoney } = require("../utils/format");
const { MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "mission",
  description: "Tạo nhiệm vụ",
  type: "CHAT_INPUT",
  permissions: ["ADMINISTRATOR"],
  options: [
    {
      name: "type",
      description: "Nhập type muốn mua",
      type: "STRING",
      required: true,
    },
    {
      name: "amount",
      description: "Nhập số lượng muốn mua",
      type: "NUMBER",
      required: true,
      min_value: 1,
    },
    {
      name: "price",
      description: "Nhập giá muốn trả",
      type: "NUMBER",
      required: true,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    try {
      const user = User.findOne({ id: interaction.user.id });
      if (!user) return interaction.reply("Bạn chưa đăng ký");
      const type = interaction.options.get("type").value;
      const amount = interaction.options.get("amount").value;
      const price = interaction.options.get("price").value;

      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId("yes")
            .setLabel("YES")
            .setStyle("SUCCESS")
        )
        .addComponents(
          new MessageButton()
            .setCustomId("no")
            .setLabel("NO")
            .setStyle("DANGER")
        );

      const filter = (btnInteraction) =>
        interaction.user.id === btnInteraction.user.id;

      const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 60 * 1000,
      });
      collector.on("collect", (i) => {
        console.log(i.collected);
      });

      collector.on("end", (collection) => {


        return interaction.editReply({
          content: "Đã hết hạn",
          components: [],
        });
      });
      interaction.reply({
        content: `Tớ cần mua **${amount + " " + type}** với giá ${formatMoney(
          price
        )}?`,
        components: [row],
      });

      return interaction.channel.send({
        content: "Thành công",
        ephemeral: true,
      });
    } catch (error) {
      console.log(error);
      return interaction.reply({
        content: "mission: Có lỗi !!",
        ephemeral: true,
      });
    }
  },
};
