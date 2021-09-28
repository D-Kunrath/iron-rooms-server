const { Router } = require("express");

const Review = require("../models/Review.model");
const Room = require("../models/Room.model");

const router = Router();

// CRUD = Create, Read, Update, Delete

// criar comentário em uma sala
router.post("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const { id } = req.user;
  try {
    // verifica se o usuário é o criador da sala
    const room = await Room.findById(roomId);
    if (room.userId == id) {
      res
        .status(400)
        .json({ message: "User can't make a review on own rooms" });
      return;
    }

    // caso não seja a sala do próprio usuário, cria o review
    const newReview = { ...req.body, roomId, userId: id };
    const reviewFromDB = await Review.create(newReview);

    // depois de criar o review, injeta o id do review na sala correspondente
    await Room.findByIdAndUpdate(roomId, {
      $push: { reviews: reviewFromDB._id },
    });

    res.status(201).json(reviewFromDB);
  } catch (error) {
    res.status(500).json({ message: "Error trying to create a review", error });
  }
});

// pegar todos os comentários de uma sala
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  try {
    // popula os comentários com o nome dos usuários
    const reviews = await Review.find({ roomId }).populate(
      "userId",
      "username"
    );
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error trying to get reviews", error });
  }
});

// deletar um comentário
router.delete("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { id } = req.user;

  try {
    // verifica se o comentário existe
    const review = await Review.findById(reviewId);

    // verifica se o criador do comentário é o próprio usuário
    if (review.userId != id) {
      return res.status(400).json("User can't delete other user's reviews");
    }

    // deleta comentário da coleção "reviews"
    await Review.findByIdAndDelete(reviewId);

    // remove o id do comentário da sala
    await Room.findByIdAndUpdate(review.roomId, {
      $pull: { reviews: reviewId },
    });
    res.status(200).json({ message: "Deleted review" });
  } catch (error) {
    res.status(500).json({ message: "Error trying to delete a review", error });
  }
});

/*
    ### ABAIXO FOI FEITO FORA DO CODE ALONG ###
*/

// atualiza um comentário
router.put("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { id } = req.user;
  try {
    // procura e atualiza um comentário que tenha ambos o reviewId e o userId
    const review = await Review.findOneAndUpdate(
      { _id: reviewId, userId: id },
      req.body,
      { new: true }
    );
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error trying to update a review", error });
  }
});

module.exports = router;
