const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore.js');

const app = express();
app.use(morgan('common'));

app.get('/apps', (req, res) => {
  const { app = '', sort, genre = '' } = req.query;

  if (sort) {
    if (!['App', 'rating'].includes(sort)) {
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

  if (sort) {
    results.sort((a, b) => {
      return a[rating] > b[rating] ? 1 : a[rating] < b[rating] ? -1 : 0;
    });
  }

  res.json(results);
});
