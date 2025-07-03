const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    rating: {
      type: Number, // Changed from String to Number
      required: true, // Fixed typo: reqired -> required
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
      index: true,
    },
  },
  {
    timestamps: true, // Add timestamps for createdAt and updatedAt
  }
);

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
