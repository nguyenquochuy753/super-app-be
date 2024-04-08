const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const cinemaSystemRouter = require("./Routes/CinemaSystem.route");
const theaterComplexRouter = require("./Routes/TheaterComplex.route");
const theaterRouter = require("./Routes/Theater.route");
const seatRouter = require("./Routes/Seat.route");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
  console.log("Connected MongoDB");
});

app.use("/cinemaSystem", cinemaSystemRouter);
app.use("/theaterComplex", theaterComplexRouter);
app.use("/theater", theaterRouter);
app.use("/seat", seatRouter);

app.listen(8001, () => {
  console.log("Server is running on port 8001");
});
