const mongoose = require("mongoose");

const connect = async () => {
  const connection = await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected to DB: ${connection.connections[0].name}`);
};

connect();
