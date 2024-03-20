const Movie = require("../models/movie");
const slugify = require("slugify");

exports.createMovie = (req, res) => {
  console.log(req.body);

  const {
    id,
    name,
    trailer,
    image,
    description,
    group,
    openingDay,
    rating,
    hot,
    nowShowing,
    comingSoon,
  } = req.body;

  let slug = slugify(name);

  const movie = new Movie({});

  //   product.save((error, product) => {
  //     if (error) return res.status(400).json({ error });
  //     if (product) {
  //       res.status(201).json({ product });
  //     }
  //   });
};
