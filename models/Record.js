const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  categoryId: {
    type: String,
    required: [true, "Category ID is required."],
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
  userId: {
    type: String,
    required: [true, "User ID is required."],
  },
});

module.exports = mongoose.model("record", recordSchema);
