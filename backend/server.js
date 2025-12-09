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