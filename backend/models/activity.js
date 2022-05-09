const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new mongoose.Schema({
  activities: [
    {
      createdAt: {
        type: Date,
        default: new Date()
      },
      type: {
        type: String,
      },
      comment: {
        type: String,
      },
      by: { type: String },
    },
  ],
});

module.exports = mongoose.model("activity", activitySchema);
