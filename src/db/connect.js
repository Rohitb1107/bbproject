const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/bbdata", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected successfully!");
  })
  .catch((err) => {
    console.log("Something went wrong:", err);
  });
