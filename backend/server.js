const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(cors());

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sz_hubi",
    port: "3307"
});

app.get("/", (req, res) => {
    res.send("Megy a backend");
}
);
app.get("/konyvek", (req, res) => {
    const sqlSelect = "SELECT konyv.Konyv_ID,konyv.Konyv_Cime FROM konyv";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    });
});
app.post("/konyvek/uj", (req, res) => {
    const cim = req.body.cim;
    const szerzo = req.body.szerzo;
    const kiado = req.body.kiado;
    const sqlInsert = "INSERT INTO konyv (cim, szerzo, kiado) VALUES (?,?,?)";
    db.query(sqlInsert, [cim, szerzo, kiado], (err, result) => {
        console.log(result);
    });
});
app.delete("/konyvek/torol/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM konyv WHERE id = ?";
    db.query(sqlDelete, id, (err, result) => {
        if (err) console.log(err);
    });
});


app.listen(3001, () => {
    console.log("A Server a 3001 porton fut.");
});