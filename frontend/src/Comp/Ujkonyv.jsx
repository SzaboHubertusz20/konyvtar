import React, { useState } from "react";
import axios from "axios";

export default function UjKonyv() {
  const [cim, setCim] = useState("");
  const [mufaj, setMufaj] = useState("");
  const [szerzoId, setSzerzoId] = useState("");

  const kuldes = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3001/konyvek/uj", {
      Konyv_Cime: cim,
      Konyv_Mufaj: mufaj,
      Szerzo_ID: szerzoId
    })
    .then(() => {
      alert("Könyv sikeresen felvéve!");
      setCim("");
      setMufaj("");
      setSzerzoId("");
    })
    .catch(err => {
      alert("Hiba: " + err.response?.data?.error);
    });
  };

  return (
    <div>
      <h2>Új könyv hozzáadása</h2>

      <form onSubmit={kuldes}>
        <div>
          <label>Cím: </label>
          <input value={cim} onChange={e => setCim(e.target.value)} />
        </div>

        <div>
          <label>Műfaj: </label>
          <input value={mufaj} onChange={e => setMufaj(e.target.value)} />
        </div>

        <div>
          <label>Szerző ID: </label>
          <input
            type="number"
            value={szerzoId}
            onChange={e => setSzerzoId(e.target.value)}
          />
        </div>

        <button type="submit">Hozzáadás</button>
      </form>
    </div>
  );
}
