const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
const hbs = require("hbs");
require("./db/connect");
const bcrypt = require("bcryptjs");

const Register = require("../models/register.model");

const static_path = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

// Register part

app.get("/register", async (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const password2 = req.body.password2;

    if (password === password2) {
      const registerUser = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2,
      });

      const addUser = await registerUser.save();
      res.status(201).render("login");
    } else {
      res.send("passwords are not matching");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login Part

app.get("/login", async (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userEmail = await Register.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, userEmail.password);

    if (isMatch) {
      res.status(201).render("index");
    } else {
      res.send("Invalid credentials!");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server start running on port ${PORT}.`);
});
