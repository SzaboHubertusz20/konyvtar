import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Konyvek() {
  const [konyvek, setKonyvek] = useState([]);

  const betoltes = () => {
    axios.get("http://localhost:3001/konyvek")
      .then(res => setKonyvek(res.data))
      .catch(err => console.error("Hiba:", err));
  };

  useEffect(() => { betoltes(); }, []);

  const torles = (id) => {
    if (!window.confirm("Biztos törlöd?")) return;

    axios.delete(`http://localhost:3001/konyvek/delete/${id}`)
      .then(() => betoltes())
      .catch(err => {
        alert("Hiba törlésnél: " + err.response?.data?.error);
      });
  };

  return (
    <div>
      <h2>Könyvek</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cím</th>
            <th>Műfaj</th>
            <th>Szerző</th>
            <th>Művelet</th>
          </tr>
        </thead>
        <tbody>
          {konyvek.map(k => (
            <tr key={k.Konyv_ID}>
              <td>{k.Konyv_ID}</td>
              <td>{k.Konyv_Cime}</td>
              <td>{k.Konyv_Mufaj}</td>
              <td>{k.Szerzo_Neve}</td>
              <td>
                <button onClick={() => torles(k.Konyv_ID)}>Törlés</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
    