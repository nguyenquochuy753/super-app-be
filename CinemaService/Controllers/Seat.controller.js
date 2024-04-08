const seatModel = require("../Models/Seat.model");

const seatController = {
  addSeat: async (req, res) => {
    try {
      const newSeat = new seatModel(req.body);
      await newSeat.save();
      res.status(201).json(newSeat);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  getAllSeat: async (req, res) => {
    try {
      const seats = await seatModel.find();
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
};

module.exports = seatController;
