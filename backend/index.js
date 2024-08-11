const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/stacks", (req, res) => {
  const query = "SELECT * FROM STACK";
  db.query(query, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.get("/cards", (req, res) => {
  const id = req.query.id;
  if (!id) return res.status(400).send("Stack not found");

  const query = `SELECT id, question, answer FROM card WHERE stack_id=${id}`;
  db.query(query, function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

app.listen(port, () => {
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
  });
  console.log(`Server is running on http://localhost:${port}`);
});
