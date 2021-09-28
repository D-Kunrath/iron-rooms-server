const { Router } = require("express");

const Room = require("../models/Room.model");
const Review = require("../models/Review.model");

const router = Router();

// CRUD = Create, Read, Update, Delete

// criar sala
router.post("/", async (req, res) => {
  const { id } = req.user;
  try {
    const room = await Room.create({ ...req.body, userId: id });
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error trying to create a room", error });
  }
});

// pega salas
router.get("/all", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error trying to get all rooms", error });
  }
});

// pega uma sala específica
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findById(roomId).populate({
      path: "reviews",
      select: ["comment", "roomId"],
    });
    res.status(200).json(room);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error trying to get specific room", error });
  }
});

// atualizar uma sala
router.put("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findByIdAndUpdate(roomId, req.body, { new: true });
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: "Error trying to update a room", error });
  }
});

// deletar uma sala
router.delete("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    // deleta a sala
    await Room.findByIdAndDelete(roomId);

    // deleta os comentários da sala
    await Review.deleteMany({ roomId });
    res.status(200).json({ message: "Deleted a room and it's reviews" });
  } catch (error) {
    res.status(500).json({ message: "Error trying to delete a room", error });
  }
});

/*
    ### ABAIXO FOI FEITO FORA DO CODE ALONG ###
*/

// pega as salas do próprio usuário
router.get("/user", async (req, res) => {
  const { id: userId } = req.user;
  try {
    const rooms = await Room.find({ user: userId });
    res.status(200).json(rooms);
  } catch (error) {
    res
      .status(500)
      .json({ mesage: "error getting rooms from user", error: error.message });
  }
});

module.exports = router;
