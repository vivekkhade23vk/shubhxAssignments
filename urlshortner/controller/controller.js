
const shortid = require('shortid');
const urlModel = require('../model/model');

exports.createShortUrl = async (req, res) => {
  const { originalUrl, customCode, expirationDays } = req.body;
  if (!/^https?:\/\/\S+$/.test(originalUrl)) {
    return res.status(400).json({ error: 'Invalid URL' });
  }
  
  let shortCode = customCode || shortid.generate();
  const expirationDate = expirationDays ? new Date(Date.now() + expirationDays * 86400000) : null;

  try {
    const newUrl = await urlModel.create({ originalUrl, shortCode, expirationDate });
    res.json({ shortUrl: `${req.headers.host}/${shortCode}`, shortCode });
  } catch (error) {
    res.status(500).json({ error: 'Error creating short URL' });
  }
};

exports.redirectUrl = async (req, res) => {
  try {
    const url = await urlModel.findOne({ shortCode: req.params.code });
    if (!url || (url.expirationDate && url.expirationDate < new Date())) {
      return res.status(410).json({ error: 'URL expired or not found' });
    }
    url.clicks += 1;
    await url.save();
    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ error: 'Error redirecting URL' });
  }
};
