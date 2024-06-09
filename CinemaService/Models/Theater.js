// Theater.js
const AbstractClass = require("../../Template");
const TheaterModel = require("./Theater.model");

class Theater extends AbstractClass {
  constructor() {
    super();
    this.model = TheaterModel;
  }

  async retrieveAll() {
    try {
      const theaters = await this.model.find({});
      return theaters;
    } catch (error) {
      throw new Error("Lỗi khi lấy thông tin rạp chiếu phim.");
    }
  }
  async retrieveByID(_id) {
    try {
      const theater = await this.model.findById(_id);
      return theater;
    } catch (error) {
      throw new Error("Lỗi khi lấy thông tin rạp chiếu phim.");
    }
  }
}

module.exports = Theater;
