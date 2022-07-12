const { category } = require("../utils/category");

const choices = [];
category.eat.forEach((item) => {
  if (item !== "meat") {
    choices.push({
      name: item,
      value: item,
    });
  }
});
module.exports = {
  name: "cooking",
  description: "Nấu ăn",
  type: "CHAT_INPUT",
  options: [
    {
      name: "food",
      description: "Loại",
      required: true,
      type: "STRING",
      choices,
    },
    {
      name: "amount",
      description: "Số lượng",
      required: true,
      type: "INTEGER",
      min_value: 1,
      max_value: 10,
    },
  ],

  run: async (client, interaction, user) => {
    const food = interaction.options.get("food").value;
    const amount = interaction.options.get("amount").value;

    const recipe = {
      rice: {
        meat: 6,
        salad: 3,
        tomato: 2,
        peanut: 4,
      },
      noodle: {
        meat: 10,
        salad: 6,
        tomato: 2,
        peanut: 2,
        corn: 3,
        carrot: 1,
      },
      bread: {
        meat: 1,
        salad: 1,
        tomato: 1,
      },
    };

    try {
      //  recipe check
      let isRecipeValid = true;
      let recipeText = "";
      for (let key in recipe) {
        if (key === food) {
          Object.keys(recipe[key]).forEach((item) => {
            recipeText += `- **${item}**: ${recipe[key][item] * amount} \n`;
            if (user.inventory.food[item] < recipe[key][item]) {
              user.inventory.food[item] += recipe[key][item] * amount;
              isRecipeValid = false;
            }
          });
        }
      }
      if (!isRecipeValid) {
        return interaction.reply(
          `Bạn không đủ nguyên liệu Để chế biến **${amount} ${food}**, cần các nguyên liệu sau:\n${recipeText}`
        );
      }

      // gas check
      if (user.inventory.tool.gas < 2) {
        return interaction.reply("Cần tối thiểu là 2 bình gas để chế biến");
      }

      interaction.reply(`${interaction.user.username} đang chế biến... 🍖`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2500);
      });
      interaction.channel.send(`🍳🍳🍳`);
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      for (let key in recipe[food]) {
        user.inventory.food[key] -= recipe[food][key];
      }

      user.inventory.gas -= 2;
      user.inventory.food[food] += amount;
      user.save();

      return interaction.channel.send(
        `Bạn đã chế biến **${amount} ${food}** thành công `
      );
    } catch (error) {
      console.log(error);
      return interaction.reply("cooking: có lỗi");
    }
  },
};
