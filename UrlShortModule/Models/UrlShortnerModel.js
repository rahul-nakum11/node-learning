const mongoose = require("mongoose");

const UrlShortnerSchema = mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: Number,
      },
    ],
  },
  { timestamps: true }
);

const urlModel = mongoose.model("url_shortner", UrlShortnerSchema);

module.exports = urlModel;
