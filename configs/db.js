const mongoose = require("mongoose");
const DB = process.env.DB_URL.replace("<password>", process.env.DB_PASSWORD);
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
