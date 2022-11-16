const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  subject: {
    type: String,
    trime: true,
    required: true,
  },
  description: {
    type: String,
    trime: true,
    required: true,
  },
  status: {
    type: String,
    trime: true,
    required: true,
  },
  date: {
    type: Date,
    require: true,
  },
  role: {
    type: String,
    trime: true,
    required: true,
  },
  file: {
    type: String,
    trime: true,
    required: true,
  },
});

module.exports = mongoose.model("submission", submissionSchema);
