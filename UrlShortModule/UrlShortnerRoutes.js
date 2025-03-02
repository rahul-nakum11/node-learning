const express = require("express");
const {
  handleUrlShortner,
  handleGenerateNewShortURL,
  handleUrlRedirect,
  handleUrlClickAnalytics,
} = require("./Controllers/UrlShortner");
const UrlShortnerRoutes = express.Router();

UrlShortnerRoutes.route("/")
  .get(handleUrlShortner)
  .post(handleGenerateNewShortURL);

UrlShortnerRoutes.route("/:shortId").get(handleUrlRedirect);
UrlShortnerRoutes.route("/analytics/:shortId").get(handleUrlClickAnalytics);

module.exports = UrlShortnerRoutes;
