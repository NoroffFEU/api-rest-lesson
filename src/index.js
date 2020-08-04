const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const db = require("./db");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all animals in database
app.get("/animals", async (req, res) => {
  try {
    const result = await db.getAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong"
    });
  }
});

// Get one animal in database
app.get("/animals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.getOne(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong"
    });
  }
});

// Create an animal in database
app.post("/animals", async (req, res) => {
  const { name, type, color, legs, gender } = req.body;

  if (name && type && color && legs && gender) {
    try {
      const result = await db.createOne(req.body);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          message: `Animal created with id ${result.insertId}`
        });
      }
      res.status(404).json({
        message: "Could not create animal"
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong"
      });
    }
  } else {
    res.status(400).json({
      message: "Missing required field"
    });
  }
});

// Update an animal in database
app.put("/animals/:id", async (req, res) => {
  const { name, type, color, legs, gender } = req.body;
  const { id } = req.params;

  if (name && type && color && legs && gender) {
    try {
      const result = await db.updateOne(id, req.body);

      if (result.affectedRows > 0) {
        return res.status(201).json({
          message: `Updated animal with id ${result.insertId}`
        });
      }
      res.status(404).json({
        message: `Could not update animal. Perhaps no animal with id ${id} exists`
      });
    } catch (error) {
      res.status(404).json({
        message: "Something went wrong"
      });
    }
  } else {
    res.status(400).json({
      message: "Missing required field"
    });
  }
});

// Delete one animal in database
app.delete("/animals/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.deleteOne(id);

    if (result.affectedRows > 0) {
      return res.status(200).json({
        message: "Animal deleted from database"
      });
    }
    res.status(200).json({
      message: "No such animal in database"
    });
  } catch (error) {
    res.status(404).json({
      message: "Something went wrong"
    });
  }
});

// Catch-all
app.use("*", (req, res) => {
  res.status(404).json({
    statusCode: 404,
    error: "Not Found",
    message: `Invalid route ${req.originalUrl}`
  });
});

app.listen(PORT || 3000, () => console.log(`Server listening on http://localhost:${PORT}/`));
