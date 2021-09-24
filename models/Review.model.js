const { model, Schema } = require("mongoose");

const reviewSchema = new Schema(
  {
    comment: {
      type: String,
      maxlenght: 200,
      required: true,
    },
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    user: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
