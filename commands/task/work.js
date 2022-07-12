const dig = require("./job/dig");
const hunting = require("./job/hunting");
const fishing = require("./job/fishing");

module.exports = {
  name: "work",
  description: "Cùng nhau quậch nào ",
  cooldown: 20,
  type: "CHAT_INPUT",
  options: [
    {
      name: "job",
      description: "Chọn công việc bạn cần làm",
      required: true,
      type: "STRING",
      choices: [
        {
          name: "Dig",
          value: "dig",
        },
        {
          name: "Fishing",
          value: "fishing",
        },
        {
          name: "Hunting",
          value: "hunting",
        },
        {
          name: "Farming",
          value: "farm",
        },
      ],
    },
  ],
  run: async (client, interaction, user) => {
    const jobType = interaction.options.get("job").value;
    const data = { user };

    const limit = 60;
    if (user.health.eat < limit || user.health.drink < 60) {
      client.cooldowns.get("work").delete(interaction.user.id);
      return interaction.reply(
        `Bạn đã kiệt sức. Để tiếp tục làm việc, bạn cần có ít nhất **${
          jobType === "hunting" ? 100 : 60
        } food và 60 drink**`
      );
    }

    switch (jobType) {
      case "dig":
        dig(client, interaction, data);
        break;
      case "fishing":
        fishing(client, interaction, data);
        break;
      case "hunting":
        hunting(client, interaction, data);
        break;

      default:
        console.log("work: ko có dữ liệu");
    }
  },
};
