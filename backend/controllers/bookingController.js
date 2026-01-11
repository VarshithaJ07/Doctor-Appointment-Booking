import Booking from "../models/BookingSchema.js";

export const createBooking = async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.json({ success: true, booking });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find().populate("doctor user", "name email");
    res.json(bookings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("doctor user", "name");
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
