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

app.get('/konyvek', (req, res) => {
    const sql = `
      SELECT 
        k.Konyv_ID,
        k.Konyv_Cime,
        k.Konyv_Mufaj,
        s.Szerzo_Neve
      FROM konyv k
      JOIN szerzo s ON k.Szerzo_ID = s.Szerzo_ID
      ORDER BY k.Konyv_ID DESC
    `;
    db.query(sql, (err, results) => {
      if (err) {
        console.error('DB hiba /api/konyvek:', err);
        return res.status(500).json({ error: 'Adatbázis hiba.' });
      }
      res.json(results);
    });
  });
  
app.post('/konyvek/uj', (req, res) => {
    const { Konyv_Cime, Konyv_Mufaj, Szerzo_ID } = req.body;
  
 
    if (!Konyv_Cime || !Konyv_Mufaj || !Szerzo_ID) {
      return res.status(400).json({ error: 'Konyv_Cime, Konyv_Mufaj és Szerzo_ID kötelező.' });
    }
  
    
    const checkAuthorSql = 'SELECT Szerzo_ID FROM szerzo WHERE Szerzo_ID = ? LIMIT 1';
    db.query(checkAuthorSql, [Szerzo_ID], (err, authorRes) => {
      if (err) {
        console.error('DB hiba szerző ellenőrzésnél:', err);
        return res.status(500).json({ error: 'Adatbázis hiba.' });
      }
      if (authorRes.length === 0) {
        return res.status(404).json({ error: 'A megadott Szerzo_ID nem létezik.' });
      }
  
      const insertSql = `
        INSERT INTO konyv (Konyv_Cime, Konyv_Mufaj, Szerzo_ID)
        VALUES (?, ?, ?)
      `;
      db.query(insertSql, [Konyv_Cime, Konyv_Mufaj, Szerzo_ID], (err, result) => {
        if (err) {
          console.error('DB hiba /api/konyvek (INSERT):', err);
          return res.status(500).json({ error: 'Adatbázis hiba.' });
        }
        return res.status(201).json({
          message: 'Könyv létrehozva.',
          Konyv_ID: result.insertId,
          data: { Konyv_Cime, Konyv_Mufaj, Szerzo_ID },
        });
      });
    });
  });

  app.delete('/konyvek/delete/:id', (req, res) => {
    const Konyv_ID = Number(req.params.id);
  
    if (!Number.isInteger(Konyv_ID) || Konyv_ID <= 0) {
      return res.status(400).json({ error: 'Érvénytelen Konyv_ID.' });
    }
  
    
    const hasLoanSql = 'SELECT Kolcsonzes_ID FROM kolcsonzes WHERE Konyv_ID = ? LIMIT 1';
    db.query(hasLoanSql, [Konyv_ID], (err, loanRes) => {
      if (err) {
        console.error('DB hiba kölcsönzés ellenőrzésnél:', err);
        return res.status(500).json({ error: 'Adatbázis hiba.' });
      }
      if (loanRes.length > 0) {
        return res.status(409).json({ error: 'A könyv nem törölhető, mert van hozzá kölcsönzés.' });
      }
  
      const deleteSql = 'DELETE FROM konyv WHERE Konyv_ID = ?';
      db.query(deleteSql, [Konyv_ID], (err, result) => {
        if (err) {
          console.error('DB hiba /api/konyvek (DELETE):', err);
          return res.status(500).json({ error: 'Adatbázis hiba.' });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Nincs ilyen könyv.' });
        }
        return res.status(200).json({ message: 'Könyv törölve.', Konyv_ID });
      });
    });
  });
    

app.listen(3001, () => {
    console.log("A Server a 3001 porton fut.");
});