const urlModel = require("../Models/UrlShortnerModel");
const { nanoid } = require("nanoid");

async function handleUrlShortner(req, res) {
  const urls = await urlModel.find({});
  return res.render("index", { urls });
}

async function handleGenerateNewShortURL(req, res) {
  const { userUrl } = req.body;
  if (!userUrl) return res.status(400).json({ msg: "URL is required!" });
  const shortId = await nanoid(8);
  await urlModel.create({
    shortId,
    redirectUrl: userUrl,
    visitHistory: [],
  });
  return res.json({ id: shortId });
}

async function handleUrlRedirect(req, res) {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  res.redirect(entry.redirectUrl);
}

async function handleUrlClickAnalytics(req, res) {
  const shortId = req.params.shortId;
  const results = await urlModel.findOne({ shortId });

  res.json({
    totalClicks: results.visitHistory.length,
    analytics: results.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleUrlShortner,
  handleUrlRedirect,
  handleUrlClickAnalytics,
};
