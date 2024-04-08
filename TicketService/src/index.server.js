const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);

app.use(cors());
const ticketRoutes = require("./routes/ticket");

env.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.zx8cqmv.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
  });

app.use(express.json());
app.use("/api", ticketRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
