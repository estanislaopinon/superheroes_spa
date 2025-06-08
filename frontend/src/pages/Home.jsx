import { useState, useEffect } from "react";
import axios from "axios";
import SuperheroCard from "../components/SuperheroCard";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {
  const [superheroes, setSuperheroes] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/superheroes")
      .then((response) => setSuperheroes(response.data))
      .catch(() => toast.error("Error al cargar superhéroes"));
  }, []);

  const filteredSuperheroes = superheroes.filter((s) =>
    s.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este superhéroe?")) {
      try {
        await axios.delete(`http://localhost:5000/api/superhero/${id}`);
        setSuperheroes(superheroes.filter((s) => s._id !== id));
        toast.success("Superhéroe eliminado con éxito");
      } catch (err) {
        toast.error("Error al eliminar superhéroe");
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Superhéroes</h1>
      <input
        type="text"
        placeholder="Filtrar por nombre"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="border p-2 mb-4 w-full max-w-md"
      />
      <Link
        to="/create"
        className="bg-blue-500 text-white p-2 mb-4 inline-block"
      >
        Crear Superhéroe
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredSuperheroes.map((superhero) => (
          <div key={superhero._id} className="relative">
            <SuperheroCard superhero={superhero} />
            <button
              onClick={() => handleDelete(superhero._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
