import { Link } from "react-router-dom";

const SuperheroCard = ({ superhero }) => {
  return (
    <Link
      to={`/superhero/${superhero._id}`}
      className="border rounded-lg p-4 shadow hover:shadow-lg"
    >
      <img
        src={`http://localhost:5000${superhero.images[0]}`}
        alt={superhero.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-xl font-bold">{superhero.name}</h2>
      {superhero.realName && (
        <p className="text-gray-600">Nombre real: {superhero.realName}</p>
      )}
      <p className="text-gray-500">{superhero.biography.slice(0, 100)}...</p>
    </Link>
  );
};

export default SuperheroCard;
