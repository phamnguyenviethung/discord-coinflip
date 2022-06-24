module.exports = {
  name: "register",
  category: "coinflip",
  aliases: ["reg"],
  run: (client, messageCreate, args) => {
    console.log(client);
    console.log(messageCreate);
    console.log(args);
  },
};
