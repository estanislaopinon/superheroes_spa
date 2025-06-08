import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SuperheroDetail = () => {
  const { id } = useParams();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/superhero/${id}`)
      .then((response) => setSuperhero(response.data))
      .catch(() => toast.error("Error al cargar el superhéroe"));
  }, [id]);

  if (!superhero) return <div>Cargando...</div>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{superhero.name}</h1>
      <img
        src={`http://localhost:5000${superhero.images[0]}`}
        alt={superhero.name}
        className="w-full h-96 object-cover rounded"
      />
      <img
        src={superhero.house === "Marvel" ? "/marvel-logo.png" : "/dc-logo.png"}
        alt={`${superhero.house} logo`}
        className="w-24 mt-4"
      />
      <p>
        <strong>Nombre real:</strong> {superhero.realName || "N/A"}
      </p>
      <p>
        <strong>Año de aparición:</strong> {superhero.yearAppeared}
      </p>
      <p>
        <strong>Casa:</strong> {superhero.house}
      </p>
      <p>
        <strong>Biografía:</strong> {superhero.biography}
      </p>
      <p>
        <strong>Equipamiento:</strong> {superhero.equipment || "N/A"}
      </p>
    </div>
  );
};

export default SuperheroDetail;
