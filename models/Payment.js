const mongoose = require("mongoose");
const schema = mongoose.schema;

const paymentSchema = new mongoose.Schema({
UserName: {
    type: String,
    required: true,
  },
 Total: {
    type: String,
    required: true,
  }

}, { timestamps: true });

const Payment = mongoose.model("payment", paymentSchema);
module.exports = Payment;
