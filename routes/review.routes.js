const { Router } = require("express");

const Review = require("../models/Review.model");
const Room = require("../models/Room.model");

const router = Router();

// get reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error trying to get reviews", error: error.message });
  }
});

// get a review
router.get("/:reviewId", async (req, res) => {
  const { reviewId } = req.body;
  try {
    const review = await Review.findById(reviewId);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "error trying to get a review", error });
  }
});

// get reviews from a room
router.get("/room/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const reviews = await Review.find({ roomId }).populate("user", [
      "username",
      "_id",
    ]);
    res.status(200).json(reviews);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error trying to get room reviews", error });
  }
});

// create a review
router.post("/:roomId", async (req, res) => {
  const { id } = req.user;
  const { roomId } = req.params;
  try {
    const review = await Review.create({ ...req.body, roomId, user: id });
    await Room.findByIdAndUpdate(roomId, { $push: { reviews: review._id } });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: "error trying to craete a review",
      error: error.message,
    });
  }
});

// update a review
router.put("/:reviewId", async (req, res) => {
  const { id: userId } = req.user;
  const { reviewId } = req.params;
  try {
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId },
      req.body,
      { new: true }
    );
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "error trying to update a review", error });
  }
});

// delete a review
router.delete("/:reviewId", async (req, res) => {
  const { id: userId } = req.user;
  const { reviewId } = req.params;
  try {
    await Review.findOneAndDelete({ _id: reviewId, user: userId });
    res.status(200).json({ message: "review deleted" });
  } catch (error) {
    res.status(500).json({ message: "error trying to delete a review", error });
  }
});

module.exports = router;
