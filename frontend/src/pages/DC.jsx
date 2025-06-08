import { useState, useEffect } from "react";
import axios from "axios";
import SuperheroCard from "../components/SuperheroCard";
import { toast } from "react-toastify";

const DC = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/superheroes/DC")
      .then((response) => setSuperheroes(response.data))
      .catch(() => toast.error("Error al cargar superhéroes de DC"));
  }, []);

  const filteredSuperheroes = superheroes.filter((s) =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Superhéroes de DC</h1>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-4 w-full max-w-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSuperheroes.map((superhero) => (
          <SuperheroCard key={superhero._id} superhero={superhero} />
        ))}
      </div>
    </div>
  );
};

export default DC;
