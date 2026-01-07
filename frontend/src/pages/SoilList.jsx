import { useEffect, useState } from "react";
import api from "../services/api";

export default function SoilList() {
  const [soils, setSoils] = useState([]);

  useEffect(() => {
    api.get("/soils").then(res => setSoils(res.data));
  }, []);

  return (
    <div>
      <h2>Soil Types</h2>
      {soils.map(s => (
        <div key={s._id} style={{ border: "1px solid #ccc", margin: 10 }}>
          <h3>{s.name}</h3>
          <p>{s.characteristics}</p>
        </div>
      ))}
    </div>
  );
}
