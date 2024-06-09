const TheaterComplex = require("../Models/TheaterComplex.model");
const Theater = require("../Models/Theater.model");
const Singleton = require("../../Singleton");
const ClassFactory = require("../../Factory");
const TheaterIns = require("../Models/Theater");

const theaterFactory = ClassFactory.createTheaterClass();

const theaterController = {
  addTheater: async (req, res) => {
    const { theaterComplexId } = req.params;
    const { theaters } = req.body;

    try {
      let theaterComplex = await TheaterComplex.findById(theaterComplexId);

      if (!theaterComplex) {
        return res.status(404).json({ message: "Theater complex not found" });
      }

      let createdTheaters = await Promise.all(
        theaters.map(async (theater) => {
          let newTheater = new Theater({ name: theater.name });
          await newTheater.save();
          return newTheater._id;
        })
      );

      theaterComplex.theaterList.push(...createdTheaters);

      await theaterComplex.save();

      res.status(201).json({
        message: `Added succesfully ${createdTheaters.length} theater into theater complex`,
        theaterComplex: theaterComplex,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  addTheaterByTheaterComplexName: async (req, res) => {
    // const { theaterComplexId } = req.params;
    const { theaters, theaterComplexName } = req.body;
    const theaterComplex = await TheaterComplex.findOne({
      name: theaterComplexName,
    });
    const theaterComplexId = theaterComplex._id;

    try {
      let theaterComplex = await TheaterComplex.findById(theaterComplexId);

      if (!theaterComplex) {
        return res.status(404).json({ message: "Theater complex not found" });
      }

      let createdTheaters = await Promise.all(
        theaters.map(async (theater) => {
          let newTheater = new Theater({ name: theater.name });
          await newTheater.save();
          return newTheater._id;
        })
      );

      theaterComplex.theaterList.push(...createdTheaters);

      await theaterComplex.save();

      res.status(201).json({
        message: `Added succesfully ${createdTheaters.length} theater into theater complex`,
        theaterComplex: theaterComplex,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  getAllTheaters: async (req, res) => {
    try {
      //const theaters = await Theater.find({});
      // const theater = new TheaterIns();
      const theaters = await theaterFactory.getAll();
      res.status(200).json(theaters);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getTheaterComplexByID: async (req, res) => {
    try {
      const { _id } = req.params;
      // const theater = await Theater.findById(_id);
      // const theaterIns = new TheaterIns();
      const theater = await theaterFactory.getByID(_id);
      res.status(200).json(theater);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = theaterController;
