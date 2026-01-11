import Review from "../models/ReviewSchema.js";

export const createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    res.status(201).json({ success: true, review });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("doctor", "name specialization")
      .populate("user", "name email");
    res.json(reviews);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
