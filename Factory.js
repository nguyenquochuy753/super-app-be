const MovieClass = require("./MovieService/src/movieClass");
const Theater = require("./CinemaService/Models/Theater");
class FactoryClass {
  static createMovieClass() {
    return new MovieClass();
  }

  static createTheaterClass() {
    return new Theater();
  }
}

module.exports = FactoryClass;
