const Ticket = require("../models/ticket");
const axios = require("axios");

exports.createTicket = async (req, res) => {
  try {
    const { user, showtimeId, seatId, paymentMethod } = req.body;
    const newTicket = new Ticket({
      user: user,
      showtimeId: showtimeId,
      seatId: seatId,
      paymentMethod: paymentMethod || "cash",
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTicket = async (req, res) => {
  try {
    const { _id } = req.params;
    await Ticket.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json("Updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getAllTicket = async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    const ticketInfo = [];
    for (const ticket of tickets) {
      const showtime = await axios.get(
        process.env.SHOWTIMES_URL + "/" + ticket.showtimeId
      );
      const listSeat = [];
      for (const seat of ticket.seatId) {
        const item = await axios.get(process.env.API_SEAT + "/info/" + seat);
        listSeat.push({
          cinemaId: item.data.theaterComplex.cinemaSystemId,
          theaterComplexName: item.data.theaterComplex.name,
          theaterId: item.data.seat.theaterId._id,
          theaterName: item.data.seat.theaterId.name,
          seatId: item.data.seat._id,
          seatName: item.data.seat.name,
          seatType: item.data.seat.type,
        });
      }
      const user = await axios.get(process.env.API_USER + "/" + ticket.user);
      ticketInfo.push({
        ticketId: ticket._id,
        userName: user.data.fullname,
        email: user.data.email,
        bookingDate: ticket.createdAt,
        premiereDate: showtime.data.premiereDate,
        movieName: showtime.data.movieName,
        movieImage: showtime.data.movieImage,
        price: showtime.data.ticketPrice,
        movieDuration: 120,
        listSeat: listSeat,
      });
    }
    res.status(200).json(ticketInfo);
    // res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const { _id } = req.params;
    const ticket = await Ticket.findById(_id);
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteTicketById = async (req, res) => {
  try {
    const { _id } = req.params;
    await Ticket.findByIdAndDelete(_id);
    res.status(200).json("Deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTicketByUser = async (req, res) => {
  try {
    const { _id } = req.params;
    const tickets = await Ticket.find({ user: _id });
    const user = await axios.get(process.env.API_USER + "/" + _id);
    const ticketInfo = [];
    for (const ticket of tickets) {
      const showtime = await axios.get(
        process.env.SHOWTIMES_URL + "/" + ticket.showtimeId
      );
      const listSeat = [];
      for (const seat of ticket.seatId) {
        const item = await axios.get(process.env.API_SEAT + "/info/" + seat);
        listSeat.push({
          cinemaId: item.data.theaterComplex.cinemaSystemId,
          theaterComplexName: item.data.theaterComplex.name,
          theaterId: item.data.seat.theaterId._id,
          theaterName: item.data.seat.theaterId.name,
          seatId: item.data.seat._id,
          seatName: item.data.seat.name,
          seatType: item.data.seat.type,
        });
      }
      ticketInfo.push({
        ticketId: ticket._id,
        bookingDate: ticket.createdAt,
        premiereDate: showtime.data.premiereDate,
        movieName: showtime.data.movieName,
        movieImage: showtime.data.movieImage,
        price: showtime.data.ticketPrice,
        movieDuration: 120,
        listSeat: listSeat,
      });
    }
    res.status(200).json({
      fullname: user.data.fullname,
      email: user.data.email,
      userType: user.data.userType,
      tikcetInfo: ticketInfo,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
