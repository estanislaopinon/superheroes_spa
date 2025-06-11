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
  const [images, setImages] = useState([]); // Nuevas imágenes subidas
  const [imagePreviews, setImagePreviews] = useState([]); // Vistas previas de nuevas imágenes
  const [existingImages, setExistingImages] = useState([]); // Imágenes actuales del superhéroe
  const [imagesToRemove, setImagesToRemove] = useState([]); // Imágenes marcadas para eliminar
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
          setExistingImages(response.data.images);
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

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + existingImages.length - imagesToRemove.length > 10) {
      toast.error("No puedes tener más de 10 imágenes en total");
      return;
    }
    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleRemoveExistingImage = (image) => {
    setImagesToRemove((prev) => [...prev, image]);
  };

  const handleRemoveNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("realName", formData.realName);
    data.append("yearAppeared", formData.yearAppeared);
    data.append("house", formData.house);
    data.append("biography", formData.biography);
    data.append("equipment", formData.equipment);
    images.forEach((image) => {
      data.append("images", image);
    });
    data.append("imagesToRemove", JSON.stringify(imagesToRemove));

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5000/api/superhero/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Superhéroe actualizado exitosamente");
      } else {
        await axios.post(`http://localhost:5000/api/superheroes`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
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
        encType="multipart/form-data"
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
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Imágenes (Opcional, máx. 10)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/jpeg,image/png"
            multiple
            onChange={handleImageChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            aria-describedby="images-help"
          />
          <p id="images-help" className="mt-1 text-sm text-gray-500">
            Sube hasta 10 imágenes JPG o PNG (máx. 5MB cada una). Si eliminas
            todas las imágenes, se usará la imagen predeterminada
            (/images/superheroes.jpg).
          </p>
          {isEdit && existingImages.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">
                Imágenes actuales:
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {existingImages.map(
                  (image, index) =>
                    !imagesToRemove.includes(image) && (
                      <div key={index} className="relative">
                        <img
                          src={`http://localhost:5000${image}`}
                          alt={`Imagen actual ${index + 1}`}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(image)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                          aria-label={`Eliminar imagen ${index + 1}`}
                        >
                          ×
                        </button>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
          {imagePreviews.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700">
                Nuevas imágenes:
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Vista previa de la imagen ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveNewImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      aria-label={`Eliminar nueva imagen ${index + 1}`}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
