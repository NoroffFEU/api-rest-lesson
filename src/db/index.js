require("dotenv").config();
const mysql = require("mysql");

// prettier-ignore
const noroffdb = mysql.createPool({
  user:     process.env.NODE_ENV === "production" ? process.env.MYSQL_USER     : "root",
  password: process.env.NODE_ENV === "production" ? process.env.MYSQL_PASSWORD : "",
  database: process.env.NODE_ENV === "production" ? process.env.MYSQL_DATABASE : "noroff",
  host:     process.env.NODE_ENV === "production" ? process.env.MYSQL_HOST     : "localhost",
  port:     process.env.NODE_ENV === "production" ? process.env.MYSQL_PORT     : "3306"
});

const db = {};

db.getAll = () => {
  return new Promise((resolve, reject) => {
    noroffdb.query("SELECT * FROM animals", (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.getOne = id => {
  return new Promise((resolve, reject) => {
    noroffdb.query("SELECT * FROM animals WHERE id = ?", id, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.deleteOne = id => {
  return new Promise((resolve, reject) => {
    noroffdb.query("DELETE FROM animals WHERE id = ?", id, (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.createOne = ({ name, type, color, legs, gender }) => {
  const query = "INSERT INTO animals (name, type, color, legs, gender) VALUES (?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    noroffdb.query(query, [ name, type, color, legs, gender ], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

db.updateOne = (id, { name, type, color, legs, gender }) => {
  const query = "UPDATE animals SET name=?, type=?, color=?, legs=?, gender=? WHERE id = ?";

  return new Promise((resolve, reject) => {
    noroffdb.query(query, [ name, type, color, legs, gender, id ], (error, result) => {
      if (error) {
        return reject(error);
      }
      return resolve(result);
    });
  });
};

module.exports = db;
