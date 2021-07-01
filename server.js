const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 9090;

const app = express();

app.get("/", (req, res) => {
  const id = req.query.model
  console.log(id)
  const filePath = path.resolve(__dirname, "./build", "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, `Model id: ${id}`)
      .replace(/__DESCRIPTION__/g, "Home page description.");

    res.send(data)
  });
});

// To make routes working with dynamic meta tags

//app.get("/about", (req, res) => {
//  const filePath = path.resolve(__dirname, "./build", "index.html");
//  fs.readFile(filePath, "utf8", (err, data) => {
//    if (err) {
//      return console.log(err);
//    }
//
//    data = data
//      .replace(/__TITLE__/g, "About Page")
//      .replace(/__DESCRIPTION__/g, "About page description.");
//
//    res.send(data)
//  });
//});
//
app.use(express.static(path.resolve(__dirname, "./build")))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
