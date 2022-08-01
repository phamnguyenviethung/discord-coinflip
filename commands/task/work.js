const dig = require("./job/dig");
const hunting = require("./job/hunting");
const fishing = require("./job/fishing");
const farm = require("./job/farm");
const janitor = require("./job/janitor");
const chef = require("./job/chef");
const grab = require("./job/grab");
const { choicesGenerator } = require("../../utils/choicesGenerator");
const { job } = require("../../configs/jobConfig");
const _ = require("underscore");
module.exports = {
  name: "work",
  description: "Cùng nhau work nào ",
  cooldown: 45,
  type: "CHAT_INPUT",
  options: [
    {
      name: "job",
      description: "Chọn công việc bạn cần làm",
      required: true,
      type: "STRING",
      choices: choicesGenerator([
        "janitor",
        "dig",
        "farm",
        "grab",
        "hunting",
        "fishing",
        "chef",
      ]),
    },
  ],
  run: async (client, interaction, user) => {
    const jobType = interaction.options.get("job").value;
    const data = { user };

    if (user.profile.exp.level < job[jobType].level) {
      return interaction.reply(
        `Bạn cần phải đạt **level ${job[jobType].level}** để làm **${jobType}**. Level của bạn là **${user.profile.exp.level}**`
      );
    }

    const limit = 20;
    if (user.health.eat < limit || user.health.drink < limit) {
      client.cooldowns.get("work").delete(interaction.user.id);
      return interaction.reply(
        `Bạn đã kiệt sức. Cần tối thiểu **${limit} eat và drink**`
      );
    }

    if (user.volunteer > 0) {
      user.volunteer -= 1;
      user.health.eat -= 12;
      user.health.drink -= 12;
      user.save();
      return interaction.reply(
        `Bạn vừa lao động công ích cho xã hội. Bạn cần phải làm **${user.volunteer} lần** nữa`
      );
    }

    user.health.stress += _.random(1, 3);
    await user.save();

    switch (jobType) {
      case "dig":
        dig(client, interaction, data);
        break;
      case "hunting":
        hunting(client, interaction, data);
        break;
      case "fishing":
        fishing(client, interaction, data);
        break;
      case "farm":
        farm(client, interaction, data);
        break;
      case "chef":
        chef(client, interaction, data);
        break;
      case "grab":
        grab(client, interaction, data);
        break;
      case "janitor":
        janitor(client, interaction, data);
        break;

      default:
        console.log("work: ko có dữ liệu");
    }
  },
};
