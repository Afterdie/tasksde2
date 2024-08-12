const express = require("express");
const cors = require("cors");
const db = require("./database");
const app = express();
const port = process.env.PORT;

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

app.post("/createstack", (req, res) => {
  const { topic, category } = req.body;

  const insertQuery = `INSERT INTO stack (topic, category) VALUES (?, ?)`;
  db.query(insertQuery, [topic, category], function (err, results) {
    if (err) {
      return res.status(500).send();
    }
    // getting the last inserted id
    const idQuery = `SELECT LAST_INSERT_ID() as id`;
    db.query(idQuery, function (err, results) {
      if (err) {
        return res.status(500).send();
      }
      const id = results[0].id;

      res.status(200).json({ id: id });
    });
  });
});

app.put("/editstack", (req, res) => {
  const { id, topic, category } = req.body;
  if (!id || !topic || !category) {
    return res.status(400).send();
  }

  const query = `UPDATE stack SET topic = ?, category = ? WHERE id = ?`;

  db.query(query, [topic, category, id], function (err, results) {
    if (err) {
      return res.status(500).send();
    }
    res.status(200).send();
  });
});

app.delete("/deletestack", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send();
  }

  const query = `DELETE FROM stack WHERE id = ?`;

  db.query(query, [id], function (err, results) {
    if (err) {
      return res.status(500).send();
    }
    res.status(200).send();
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

app.post("/createcard", (req, res) => {
  const { question, answer, stack_id } = req.body;

  const insertQuery = `INSERT INTO card (question, answer, stack_id) VALUES (?, ?, ?)`;
  db.query(insertQuery, [question, answer, stack_id], function (err, results) {
    if (err) {
      return res.status(500).send();
    }
    // getting the last inserted ID
    const idQuery = `SELECT LAST_INSERT_ID() as id`;
    db.query(idQuery, function (err, results) {
      if (err) {
        return res.status(500).send();
      }
      const id = results[0].id;

      res.status(200).json({ id: id });
    });
  });
});

app.put("/editcard", (req, res) => {
  const { id, stack_id, question, answer } = req.body;

  if (!id || !stack_id || !question || !answer) {
    return res.status(400).send();
  }

  const query = `UPDATE card SET question = ?, answer = ? WHERE id = ? AND stack_id = ?`;

  db.query(query, [question, answer, id, stack_id], function (err, results) {
    if (err) {
      return res.status(500).send();
    }
    res.status(200).send();
  });
});

app.delete("/deletecard", (req, res) => {
  const { id, stack_id } = req.body;

  if (!id || !stack_id) {
    return res.status(400).send();
  }
  const query = `DELETE FROM card WHERE id = ? AND stack_id = ?`;

  db.query(query, [id, stack_id], function (err, results) {
    if (err) {
      return res.status(500).send();
    }
    res.status(200).send();
  });
});

app.listen(port, () => {
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected");
  });
  console.log(`Server is running on ${port}`);
});
