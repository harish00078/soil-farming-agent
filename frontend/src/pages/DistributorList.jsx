import { useEffect, useState } from "react";
import api from "../services/api";

export default function DistributorList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get("/distributors").then(res => setList(res.data));
  }, []);

  return (
    <div>
      <h2>Distributors</h2>
      {list.map(d => (
        <div key={d._id}>
          <h3>{d.name}</h3>
          <p>{d.location}</p>
          <p>{d.contact}</p>
        </div>
      ))}
    </div>
  );
}
