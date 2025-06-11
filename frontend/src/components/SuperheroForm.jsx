import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function SuperheroForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    name: "",
    realName: "",
    yearAppeared: "",
    house: "Marvel",
    biography: "",
    equipment: "",
  });
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit) {
      const fetchSuperhero = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/superhero/${id}`
          );
          setFormData({
            name: response.data.name,
            realName: response.data.realName || "",
            yearAppeared: response.data.yearAppeared,
            house: response.data.house,
            biography: response.data.biography,
            equipment: response.data.equipment || "",
          });
        } catch (error) {
          toast.error("Error al cargar el superhéroe");
          console.error("Error fetching superhero:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSuperhero();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/superhero/${id}`, formData);
        toast.success("Superhéroe actualizado exitosamente");
      } else {
        await axios.post("http://localhost:5000/api/superheroes", formData);
        toast.success("Superhéroe creado exitosamente");
      }
      navigate("/");
    } catch (error) {
      toast.error(
        isEdit
          ? "Error al actualizar el superhéroe"
          : "Error al crear el superhéroe"
      );
      console.error("Error submitting form:", error);
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

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">
        {isEdit ? "Editar Superhéroe" : "Crear Superhéroe"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="realName"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre Real
          </label>
          <input
            type="text"
            id="realName"
            name="realName"
            value={formData.realName}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="yearAppeared"
            className="block text-sm font-medium text-gray-700"
          >
            Año de Aparición
          </label>
          <input
            type="number"
            id="yearAppeared"
            name="yearAppeared"
            value={formData.yearAppeared}
            onChange={handleChange}
            required
            min="1900"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="house"
            className="block text-sm font-medium text-gray-700"
          >
            Casa
          </label>
          <select
            id="house"
            name="house"
            value={formData.house}
            onChange={handleChange}
            required
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-required="true"
          >
            <option value="Marvel">Marvel</option>
            <option value="DC">DC</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="biography"
            className="block text-sm font-medium text-gray-700"
          >
            Biografía
          </label>
          <textarea
            id="biography"
            name="biography"
            value={formData.biography}
            onChange={handleChange}
            required
            rows="4"
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-required="true"
          ></textarea>
        </div>
        <div className="mb-4">
          <label
            htmlFor="equipment"
            className="block text-sm font-medium text-gray-700"
          >
            Equipo
          </label>
          <input
            type="text"
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            aria-label="Cancelar"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            aria-label={isEdit ? "Actualizar Superhéroe" : "Crear Superhéroe"}
          >
            {isEdit ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SuperheroForm;
