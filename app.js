// configurações
require("dotenv").config();
require("./configs/db.config");

// pacotes
const express = require("express");
const cors = require("cors");

const app = express();

// importar middlewares
const authMiddleware = require("./middlewares/auth.middleware");

// middlewares gerais
app.use(express.json());
app.use(cors());

// importar rotas
const authRoutes = require("./routes/auth.routes");
const reviewRoutes = require("./routes/review.routes");
const roomRoutes = require("./routes/room.routes");

// rotas públicas
app.use("/auth", authRoutes);

// middleware de autenticação
app.use(authMiddleware);

// rotas privadas
app.use("/review", reviewRoutes);
app.use("/room", roomRoutes);

// inicia o servidor
app.listen(process.env.PORT, () => {
  console.log(`Server running on port:`, process.env.PORT);
});

/*
    ### AS VEZES O NODEMON DÁ CONFLITO DE PORTA QUANDO REINICIA.
    O CÓDIGO ABAIXO GARANTE QUE ELE ENCERRE O PROCESSO ###
*/

process.on("SIGINT", () => {
  process.exit();
});
