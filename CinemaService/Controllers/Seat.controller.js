const seatModel = require("../Models/Seat.model");
const theaterComplexModel = require("../Models/TheaterComplex.model");

const seatController = {
  addSeat: async (req, res) => {
    try {
      // const newSeat = new seatModel(req.body);
      // await newSeat.save();
      // res.status(201).json(newSeat);
      for (let i = 67; i <= 78; i++) {
        const newSeat = new seatModel({
          name: i,
          type: "Vip",
          isBook: false,
          user: "",
          theaterId: "6608f7ec51c1aaf308e84430",
        });
        await newSeat.save();
      }
      res.status(201).json("Add successfully");
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getAllSeat: async (req, res) => {
    try {
      const seats = await seatModel.find().populate("theaterId");
      res.status(201).json(seats);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  updateSeat: async (req, res) => {
    try {
      const { _id } = req.params;
      await seatModel.findByIdAndUpdate(_id, req.body, { new: true });
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  },
  deleteSeat: async (req, res) => {
    try {
      const { _id } = req.params;
      await seatModel.findByIdAndDelete(_id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSeatByID: async (req, res) => {
    try {
      const { _id } = req.params;
      const seat = await seatModel.findById(_id);
      res.status(200).json(seat);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSeatByTheaterId: async (req, res) => {
    try {
      const { _id } = req.params;
      const seats = await seatModel
        .find({ theaterId: _id })
        .populate("theaterId");
      res.status(200).json(seats);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  bookingSeat: async (req, res) => {
    try {
      const { listSeat, user } = req.body;
      console.log(listSeat);
      for (const seat of listSeat) {
        await seatModel.findByIdAndUpdate(
          seat,
          {
            isBook: true,
            user: user,
          },
          { new: true }
        );
      }
      res.status(200).json("Booking successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getSeatInfo: async (req, res) => {
    try {
      const { _id } = req.params;
      const seat = await seatModel.findById(_id).populate("theaterId");
      const theaterComplex = await theaterComplexModel
        .findOne({ theaterList: seat.theaterId._id.toString() })
        .populate("theaterList")
        .exec();
      res.status(200).json({
        seat,
        theaterComplex,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = seatController;
