const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    id: {
      type: Number,
      require: [true, "Vui lòng cung cấp id"],
    },

    money: {
      type: Number,
      default: 1000,
    },
    workAt: Date,
    slutAt: Date,
    isBanned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
