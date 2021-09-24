require("dotenv").config();
require("./configs/db.config");
const express = require("express");
const cors = require("cors");
const app = express();

// configs
app.use(express.json());
app.use(cors());

// middleware requests
const authMiddleware = require("./middlewares/auth.middleware");

// route requests
const loginRoutes = require("./routes/auth.routes");
const roomRoutes = require("./routes/rooms.routes");
const reviewRoutes = require("./routes/reviews.routes");

// public routes
app.use("/auth", loginRoutes);

// route middlewares
app.use(authMiddleware);

// private routes
app.use("/rooms", roomRoutes);
app.use("/reviews", reviewRoutes);

// server start
app.listen(process.env.PORT, () => {
  console.log(" >>> Server running on PORT:", process.env.PORT);
});

process.on("SIGINT", () => {
  console.log(" >>> Stopping server");
  process.exit();
});
