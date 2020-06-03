const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { app = '', sort = '', genre = '' } = req.query;

  if (sort) {
    if (!['App', 'Rating'].includes(sort)) {
      return res.status(400).send('Sort must be one of App or rating');
    }
  }

  let results = playstore;

  if (app) {
    results = playstore.filter((apps) =>
      apps.App.toLowerCase().includes(app.toLowerCase())
    );
  }
  if (genre) {
    results = playstore.filter((apps) =>
      apps.Genres.toLowerCase().includes(genre.toLowerCase())
    );
  }

  if (sort === 'Rating') {
    results.sort((a, b) => {
      return a['Rating'] > b['Rating'] ? -1 : a['Rating'] < b['Rating'] ? 1 : 0;
    });
  }
  if (sort === 'App') {
    results.sort((a, b) => {
      return a['App'] > b['App'] ? -1 : a['App'] < b['App'] ? 1 : 0;
    });
  }

  res.json(results);
});

module.exports = app;
