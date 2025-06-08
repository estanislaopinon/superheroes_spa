import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SuperheroForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    realName: "",
    yearAppeared: "",
    house: "Marvel",
    biography: "",
    equipment: "",
    images: ["/images/superheroes.jpg"], // Imagen por defecto
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/superhero/${id}`)
        .then((response) => setFormData(response.data))
        .catch(() => toast.error("Error al cargar el superhéroe"));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/superhero/${id}`, formData);
        toast.success("Superhéroe actualizado con éxito");
      } else {
        await axios.post(`http://localhost:5000/api/superheroes`, formData);
        toast.success("Superhéroe creado con éxito");
      }
      navigate("/");
    } catch (err) {
      toast.error("Error al guardar el superhéroe");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-lg mx-auto">
      <div className="mb-4">
        <label className="block">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Nombre real</label>
        <input
          type="text"
          name="realName"
          value={formData.realName}
          onChange={handleChange}
          className="border w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block">Año de aparición</label>
        <input
          type="number"
          name="yearAppeared"
          value={formData.yearAppeared}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Casa</label>
        <select
          name="house"
          value={formData.house}
          onChange={handleChange}
          className="border w-full p-2"
        >
          <option value="Marvel">Marvel</option>
          <option value="DC">DC</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block">Biografía</label>
        <textarea
          name="biography"
          value={formData.biography}
          onChange={handleChange}
          className="border w-full p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block">Equipamiento</label>
        <input
          type="text"
          name="equipment"
          value={formData.equipment}
          onChange={handleChange}
          className="border w-full p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block">Imagen</label>
        <input
          type="text"
          value={formData.images[0]}
          disabled
          className="border w-full p-2 bg-gray-100"
        />
        <p className="text-sm text-gray-500">
          Todos los superhéroes usan la imagen por defecto: superheroes.jpg
        </p>
      </div>
      <button type="submit" className="bg-green-500 text-white p-2">
        Guardar
      </button>
    </form>
  );
};

export default SuperheroForm;
