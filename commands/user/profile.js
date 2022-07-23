const User = require("../../app/models/User");
const { MessageEmbed } = require("discord.js");
const { job } = require("../../configs/jobConfig");
module.exports = {
  name: "profile",
  description: "Khoe CV với anh em",
  type: "CHAT_INPUT",

  run: async (client, interaction, user) => {
    const { description, kill, jail, exp } = user.profile;
    let userJobRequireExp;
    Object.keys(job).forEach((item) => {
      if (job[item].level === exp.level) userJobRequireExp = job[item].exp;
    });
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
            name: "Exp",
            value: String(exp.amount) + `/${userJobRequireExp}`,
            inline: true,
          },
          {
            name: "Trình độ",
            value: String(exp.level),
            inline: true,
          }
        )
        .addFields(
          { name: "\u200B", value: "\u200B" },
          {
            name: "Số trận flip",
            value: String(user.statics.total),
            inline: true,
          },
          {
            name: "Tỷ lệ win",
            value: String(user.statics.winrate) + "%",
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
