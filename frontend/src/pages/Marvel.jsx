import { useState, useEffect } from "react";
import axios from "axios";
import SuperheroCard from "../components/SuperheroCard.jsx";
import { toast } from "react-toastify";

function Marvel() {
  const [superheroes, setSuperheroes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSuperheroes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/superheroes/Marvel"
        );
        setSuperheroes(response.data);
      } catch (error) {
        toast.error("Error al cargar los superhéroes de Marvel");
        console.error("Error fetching Marvel superheroes:", error);
      }
    };
    fetchSuperheroes();
  }, []);

  const filteredSuperheroes = superheroes.filter((superhero) =>
    superhero.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        Superhéroes de Marvel
      </h2>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar superhéroe de Marvel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Buscar superhéroe de Marvel"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredSuperheroes.length > 0 ? (
          filteredSuperheroes.map((superhero) => (
            <SuperheroCard key={superhero._id} superhero={superhero} />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No se encontraron superhéroes de Marvel.
          </p>
        )}
      </div>
    </div>
  );
}

export default Marvel;
