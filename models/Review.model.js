const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      maxlenght: 200,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
