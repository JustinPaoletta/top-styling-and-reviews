/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/dbconfig.js');

const server = express();

// server.use(bodyParser.text());
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../public/dist')));

// Server Requests

server.get('/recipes/:id', (req, res) => {
  const { id } = req.params;
  const getRecipe = `select * from recipes, photos where recipes.recipeID = ${id} && recipes.recipeID = photos.recipeID`;
  db.connection.query(getRecipe, (error, result) => {
    if (error) console.error(error);
    res.status(200, console.log('got my recipe!')).send(result);
  });
});

server.get('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const getReviews = `select * from reviews where reviews.comboID = ${id}`;
  db.connection.query(getReviews, (error, result) => {
    if (error) console.error(error);
    res.status(200, console.log('got my recipe!')).send(result);
  });
});

// eslint-disable-next-line no-console
server.listen(3001, () => { console.log('server ON!'); });
