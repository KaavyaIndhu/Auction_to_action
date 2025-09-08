const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  bidNumber: { type: Number, required: true },   // 👈 NEW FIELD
  bidNo: { type: String, required: true },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  bidPrice: { type: Number, required: true }
});

const round1BidsSchema = new mongoose.Schema({
  round: { type: String, default: "Round 1" },
  item_list: [itemSchema],
  item_backup: [itemSchema]
});

const Round1Bid = mongoose.model("Round1Bid", round1BidsSchema);

module.exports = Round1Bid;
