const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes.js");
const cors = require("cors");
require('dotenv').config()
const mongo = process.env.MONGO

const app = express();

mongoose.connect(
  mongo,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  }
);
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);