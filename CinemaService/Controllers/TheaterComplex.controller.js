const theaterComplexModel = require("../Models/TheaterComplex.model");
const cinemaModel = require("../Models/CinemaSystem.model");

const theaterComplexController = {
  addTheaterComplex: async (req, res) => {
    try {
      const newTheaterComplex = new theaterComplexModel(req.body);
      await newTheaterComplex.save();
      res.status(201).json(newTheaterComplex);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  addTheaterComplexByCinemaName: async (req, res) => {
    try {
      const cinemaId = await cinemaModel.findOne({ name: req.body.cinemaName });

      if (cinemaId) {
        const newTheaterComplex = new theaterComplexModel({
          name: req.body.name,
          address: req.body.address,
          cinemaSystemId: cinemaId,
          image: req.body.image,
        });
        await newTheaterComplex.save();
        res.status(201).json(newTheaterComplex);
      } else {
        res.status(500).json("Không tìm thấy hệ thống rạp");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateTheaterComplex: async (req, res) => {
    try {
      const { _id } = req.params;
      await theaterComplexModel.findByIdAndUpdate(_id, req.body, { new: true });
      res.status(200).json("Updated successfully");
    } catch (error) {
      res.status(400).json(error);
    }
  },

  getAllTheaterComplex: async (req, res) => {
    try {
      const theaterComplexes = await theaterComplexModel.find({});
      res.status(200).json(theaterComplexes);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTheaterComplexByID: async (req, res) => {
    try {
      const { _id } = req.params;
      const theaterComplex = await theaterComplexModel.findById(_id);
      res.status(200).json(theaterComplex);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTheaterComplexByCinemaID: async (req, res) => {
    try {
      const { _id } = req.params;
      const theaterComplex = await theaterComplexModel.find({
        cinemaSystemId: _id,
      });
      res.status(200).json(theaterComplex);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTheaterComplexByCinemaID: async (req, res) => {
    try {
      const { _id } = req.params;
      const theaterComplex = await theaterComplexModel.find({
        cinemaSystemId: _id,
      });
      res.status(200).json(theaterComplex);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllTheaterByCinemaAndTheaterComplex: async (req, res) => {
    try {
      const { _id } = req.params;

      const theaterComplex = await theaterComplexModel
        .findById(_id)
        .populate("theaterList");
      const theaterList = theaterComplex.theaterList;
      res.status(200).json(theaterList);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteTheaterComplexById: async (req, res) => {
    try {
      const { _id } = req.params;
      await theaterComplexModel.findByIdAndDelete(_id);
      res.status(200).json("Deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTheaterComplexByTheaterId: async (req, res) => {
    try {
      const { _id } = req.params;
      const theaterComplex = await theaterComplexModel
        .findOne({ theaterList: _id })
        .populate("theaterList")
        .exec();
      res.status(200).json(theaterComplex);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = theaterComplexController;
