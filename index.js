const express = require("express");

const app = express();
app.use(express.json());

const { Client } = require("pg");
const cliente = new Client({
  user: "postgres",
  password: "1234",
  host: "localhost",
  port: 5432,
  database: "postgres",
});

cliente.connect();
cliente
  .query("SELECT * FROM mapped_leagues")
  .then((results) => {
    app.get("/teste-leagues", async (req, res) => {
      const allData = results;
      try {
        res.status(200).send(allData.rows);
      } catch (err) {
        res.status(400).send(`Error - ${err}`);
      }
    });
  })
  .finally(() => cliente.end());
app.get("/", async (req, res) => {
  res.status(200).send("Ola");
});

app.listen(9000, () => {
  console.log(`Server online http://localhost:9000`);
});
