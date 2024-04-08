const Ticket = require("../models/ticket");

exports.createTicket = async (req, res) => {
  try {
    const { user, showtimeId, seatId, bookingDate, ticketPrice } = req.body;
    const newTicket = new Ticket({
      user: user,
      showtimeId: showtimeId,
      seatId: seatId,
      bookingDate: bookingDate,
      ticketPrice: ticketPrice,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
