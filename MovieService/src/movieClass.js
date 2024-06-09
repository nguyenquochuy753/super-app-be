// Theater.js
const AbstractClass = require("../../Template");
const MovieModel = require("./models/movie");

class MovieClass extends AbstractClass {
  constructor() {
    super();
    this.model = MovieModel;
  }

  async retrieveAll() {
    try {
      const movies = await this.model.find({});
      return movies;
    } catch (error) {
      throw new Error("Lỗi khi lấy thông tin các bộ phim.");
    }
  }
  async retrieveByID(_id) {
    try {
      const movie = await this.model.findById(_id);
      return movie;
    } catch (error) {
      throw new Error("Lỗi khi lấy thông tin phim.");
    }
  }
}

module.exports = MovieClass;
