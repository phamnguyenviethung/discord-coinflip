const User = require("../../app/models/User");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "profile",
  description: "Khoe CV với anh em",
  type: "CHAT_INPUT",

  run: async (client, interaction, user) => {
    const { description, kill, jail } = user.profile;

    try {
      const exampleEmbed = new MessageEmbed()
        .setColor("#0099ff")
        .setTitle(interaction.user.username)
        .setURL("https://discord.com/")
        .setAuthor({
          name: "Thông tin cá nhân",
          iconURL: interaction.user.displayAvatarURL(),
          url: "https://discord.com/",
        })
        .setDescription(description)
        .setThumbnail(interaction.user.displayAvatarURL())
        .addFields(
          { name: "\u200B", value: "\u200B" },
          {
            name: "Đi tù",
            value: String(jail),
            inline: true,
          },
          {
            name: "Đã bắn hạ",
            value: String(kill),
            inline: true,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "Code by pnviethung",
          iconURL: "https://i.imgur.com/AfFp7pu.png",
        });

      interaction.reply({ embeds: [exampleEmbed] });
    } catch (error) {
      console.log(error);
      return interaction.reply("profile: có lỗi");
    }
  },
};
