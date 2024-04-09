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
    res.status(200).json(tickets);
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
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json(error);
  }
};
