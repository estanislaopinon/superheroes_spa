import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SuperheroDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [superhero, setSuperhero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuperhero = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/superhero/${id}`
        );
        setSuperhero(response.data);
      } catch (error) {
        toast.error("Error al cargar los detalles del superhéroe");
        console.error("Error fetching superhero:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSuperhero();
  }, [id]);

  const handleDelete = async () => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar a ${superhero.name}? Esta acción no se puede deshacer.`
      )
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/superhero/${id}`);
        toast.success("Superhéroe eliminado exitosamente");
        navigate("/");
      } catch (error) {
        toast.error("Error al eliminar el superhéroe");
        console.error("Error deleting superhero:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Cargando...</p>
      </div>
    );
  }

  if (!superhero) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">Superhéroe no encontrado.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          aria-label="Volver a la página anterior"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <article className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          aria-label="Volver a la página anterior"
        >
          Volver
        </button>
        <div className="space-x-2">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            aria-label="Editar superhéroe"
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            aria-label="Eliminar superhéroe"
          >
            Eliminar
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={`http://localhost:5000/images/superheroes.jpg`}
              alt={`Imagen de ${superhero.name}`}
              className="w-full h-64 object-cover md:h-full"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{superhero.name}</h1>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                superhero.house === "Marvel"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {superhero.house}
            </span>
            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Información Básica</h2>
              <p>
                <strong>Nombre Real:</strong>{" "}
                {superhero.realName || "No disponible"}
              </p>
              <p>
                <strong>Año de:</strong> {superhero.yearAppeared}
              </p>
            </section>
            <section className="mb-4">
              <h2 className="text-xl font-semibold mb-2">Biografía</h2>
              <p className="text-gray-700">{superhero.biography}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-2">Equipo</h2>
              <p className="text-gray-600">
                {superhero.equipment || "No disponible"}
              </p>
            </section>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SuperheroDetail;
