const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: String,
  description: {
    type: String,
    required: true,
  },
  // Image related fields
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      mimeType: {
        type: String,
      },
      dimensions: {
        width: {
          type: Number,
        },
        height: {
          type: Number,
        },
      },
      uploadedAt: {
        type: Date,
        default: Date.now,
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      updatedAt: {
        type: Date,
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  meta: {
    created_at: { type: Date, default: Date.now },
    updated_at: Date,
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    updated_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    is_deleted: Boolean,
    deleted_at: Date,
    deleted_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    createdByIp: String,
    updatedByIp: String,
  },
});

module.exports = CategorySchema;
