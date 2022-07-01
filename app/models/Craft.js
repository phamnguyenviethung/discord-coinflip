const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CraftSchema = new Schema(
  {
    isWorking: {
      type: Boolean,
      default: true,
    },
    code: {
      type: "String",
      default: "",
      lowercase: true,
      trim: true,
    },
    require: [
      {
        name: {
          lowercase: true,
          trim: true,
          type: String,
        },
        amount: Number,
      },
    ],
    result: [
      {
        name: {
          lowercase: true,
          trim: true,
          type: String,
        },
        amount: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Craft = mongoose.model("Craft", CraftSchema);
module.exports = Craft;
