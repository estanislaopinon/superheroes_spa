import { Link } from "react-router-dom";

function SuperheroCard({ superhero }) {
  return (
    <Link
      to={`/superhero/${superhero._id}`}
      className="block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <img
        src={`http://localhost:5000${superhero.images[0]}`}
        alt={`Imagen de ${superhero.name}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{superhero.name}</h3>
        <p className="text-gray-600">
          {superhero.realName || "Nombre real desconocido"}
        </p>
        <p className="text-gray-500 text-sm">{superhero.house}</p>
      </div>
    </Link>
  );
}

export default SuperheroCard;
