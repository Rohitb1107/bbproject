const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const hbs = require("hbs");
require("./db/connect");

const static_path = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../partials");

app.use(express.static(static_path));
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(PORT, () => {
  console.log(`Server start running on port ${PORT}.`);
});
