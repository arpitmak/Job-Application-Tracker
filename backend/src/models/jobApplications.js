const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    jobLink: {
      type: String,
      trim: true,
    },

    jobDescription: {
      type: String,
    },

    status: {
      type: String,
      enum: ["applied", "interview", "offer", "rejected"],
      default: "applied",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

jobSchema.index({ user: 1, createdAt: -1 });

module.exports = model("Job", jobSchema);
