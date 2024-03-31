const TheaterComplex = require('../Models/TheaterComplex.model');
const Theater = require('../Models/Theater.model');

const theaterController = {
    addTheater: async(req,res)=>{
        const { theaterComplexId } = req.params;
        const { theaters } = req.body;

        try {
            let theaterComplex = await TheaterComplex.findById(theaterComplexId);

            if (!theaterComplex) {
                return res.status(404).json({ message: 'Theater complex not found' });
            }

            let createdTheaters = await Promise.all(theaters.map(async theater => {
                let newTheater = new Theater({ name: theater.name });
                await newTheater.save();
                return newTheater._id;
            }));

            theaterComplex.theaterList.push(...createdTheaters);

            await theaterComplex.save();

            res.status(201).json({
                message: `Added succesfully ${createdTheaters.length} theater into theater complex`,
                theaterComplex: theaterComplex
            });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    getAllTheaters: async (req, res) => {
        try {
            const theaters = await Theater.find({});
            res.status(200).json(theaters);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getTheaterComplexByID: async (req, res) => {
        try {
            const { _id } = req.params;
            const theater = await Theater.findById(_id);
            res.status(200).json(theater);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
}

module.exports = theaterController;
