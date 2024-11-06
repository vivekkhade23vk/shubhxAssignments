const express = require('express');
const { createShortUrl, redirectUrl } = require('../controller/controller');
const urlRoutes = express.Router();

urlRoutes.post('/shorten', createShortUrl);
urlRoutes.get('/:code', redirectUrl);

module.exports = urlRoutes;
