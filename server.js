/*********************************************************************************
 * WEB422 – Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Ye Jin Kim      Student ID: 163291180         Date: Jan 19th, 2021
 * Heroku Link: https://web422as1yejinkim.herokuapp.com/
 *
 ********************************************************************************/
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB(
  "mongodb+srv://yjkim33:database@cluster0.gyjkz.mongodb.net/sample_restaurants?retryWrites=true&w=majority"
);

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

//POST
app.post("/api/restaurants", (req, res) => {
  db.addNewRestaurant(req.body)
    .then((msg) => {
      console.log(msg);
      res.status(201).json({ message: `${msg}` });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: `${err}` });
    });
});

//GET

app.get("/api/restaurants", (req, res) => {
  db.getAllRestaurants(req.query.page, req.query.perPage, req.query.borough)
    .then((rest) => {
      console.log(rest);
      res.json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

//GET
app.get("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((rest) => {
      console.log(rest);
      res.json(rest);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

//PUT //Morris Park Bake Shop
app.put("/api/restaurants/:id", (req, res) => {
  db.getRestaurantById(req.params.id)
    .then((rest) => {
      if (rest != null) {
        db.updateRestaurantById(req.body, req.params.id).then((msg) => {
          console.log(msg);
          res.json(msg);
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

//DELETE
app.delete("/api/restaurants/:id", (req, res) => {
  db.deleteRestaurantById(req.params.id)
    .then((msg) => {
      console.log(msg);
      res.status(204).end();
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: `${err}` });
    });
});

db.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`server listening on: ${HTTP_PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
