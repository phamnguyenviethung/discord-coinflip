const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    money: {
      type: Number,
      require: [true, "Vui lòng cung cấp số tiền"],
      default: 0,
    },
    workAt: Date,
    slutAt: Date,
    isBanned: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
