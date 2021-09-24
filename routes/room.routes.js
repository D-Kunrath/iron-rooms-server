const { Router } = require("express");

const Room = require("../models/Room.model");

const router = Router();

// create a new room
router.post("/", async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating room", error: error.message });
  }
});

// edit a room
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating room", error: error.message });
  }
});

// delete a room
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Room.findByIdAndDelete(id);
    res.status(200).json({ message: "room deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting room", error: error.message });
  }
});

// get rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res
      .status(500)
      .json({ mesage: "error getting all rooms", error: error.message });
  }
});

// get a room
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const room = await Room.findById(id).populate("reviews");
    res.status(200).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error getting a room", error: error.message });
  }
});

module.exports = router;