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
    health: {
      eat: {
        type: Number,
        default: 200,
      },
      drink: {
        type: Number,
        default: 200,
      },
    },
    inventory: {
      cloth: {
        type: Number,
        default: 0,
      },
      wire: {
        type: Number,
        default: 0,
      },
      tape: {
        type: Number,
        default: 0,
      },
      iron: {
        type: Number,
        default: 0,
      },
      plastic: {
        type: Number,
        default: 0,
      },
    },
    // metal: {
    //   iron: {
    //     type: Number,
    //     default: 0,
    //   },
    //   plastic: {
    //     type: Number,
    //     default: 0,
    //   },
    // },
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
