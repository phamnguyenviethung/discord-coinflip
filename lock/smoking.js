const { pill } = require("../utils/category");
const choices = [];
pill.forEach((item) => {
  choices.push({
    name: item,
    value: item,
  });
});
module.exports = {
  name: "smoking",
  description: "Hút",
  type: "CHAT_INPUT",
  cooldown: 7,
  options: [
    {
      name: "pill",
      description: "Chọn đồ",
      required: true,
      type: "STRING",
      choices,
    },
  ],
  run: async (client, interaction, user) => {
    const pill = interaction.options.get("pill").value;

    const recipe = {
      marijuana: {
        rc: {
          food: {
            salad: 3,
            tomato: 3,
          },
          fishing: {
            carp: 3,
          },
          metal: {
            tape: 2,
          },
        },
        value: 5,
      },
      cocaine: {
        rc: {
          food: {
            salad: 5,
            tomato: 5,
            corn: 1,
          },
          fishing: {
            carp: 5,
          },
          metal: {
            tape: 4,
          },
        },
        value: 15,
      },
      heroin: {
        rc: {
          food: {
            salad: 5,
            tomato: 5,
            corn: 5,
            carrot: 1,
          },
          fishing: {
            phattom: 5,
            carp: 2,
          },
          metal: {
            tape: 4,
          },
        },
        value: 25,
      },
      ecstasy: {
        rc: {
          food: {
            salad: 7,
            tomato: 7,
            corn: 5,
            carrot: 4,
          },
          fishing: {
            phattom: 8,
            carp: 3,
          },
          metal: {
            tape: 6,
          },
        },
        value: 40,
      },
    };
    console.log(recipe[pill]);
    try {
      let isValid = false;
      let text;
      for (let key in recipe[pill].rc) {
        Object.keys(recipe[pill].rc[key]).forEach((item) => {
          text += `+ ${item}: ${recipe[pill].rc[key][item]} \n`;
          if (user.inventory[key][item] >= recipe[pill].rc[key]) {
            isValid = true;
          }
        });
      }

      if (!isValid)
        return interaction.reply(`Bạn không đủ nguyên liệu.\n${text}`);

      user.save();
      return interaction.reply(
        `**${interaction.user.username}** vừa bú **${food}** 🍖`
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("smoking: có lỗi");
    }
  },
};
