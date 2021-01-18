const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "API Listening" });
});

app.listen(HTTP_PORT, () => {
  console.log(`Ready to handle requests on port  ${HTTP_PORT}`);
});
