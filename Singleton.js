const Theater = require("./CinemaService/Models/Theater.model");
// Singleton.js
class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
    }
    return Singleton.instance;
  }

  // Method để khởi tạo các class
  getInstance(classType) {
    switch (classType) {
      case "theater":
        return new Theater();
      case "seatModel":
        return new SeatModel();
      case "Banner":
        return new Banner();
      case "Showtimes":
        return new Showtimes();
      case "Ticket":
        return new Ticket();
      case "addressModel":
        return new AddressModel();
      case "User":
        return new User();
      default:
        throw new Error("Class không tồn tại!");
    }
  }
}

module.exports = Singleton;
