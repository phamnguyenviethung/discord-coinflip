const mongoose = require("mongoose");
const DB =
  "mongodb+srv://pnviethung:0922981365a@cluster0.rvdce.mongodb.net/coinflip-bot";
async function connect() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully!!!");
  } catch (error) {
    console.log(error);
    console.log("Database connected failure!!!");
  }
}

module.exports = { connect };
