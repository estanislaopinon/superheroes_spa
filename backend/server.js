const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Superhero = require("./models/Superhero");

const app = express();
const PORT = 5000;

// Configuración de Multer para almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const name = `${Date.now()}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Solo se permiten imágenes JPG, JPEG o PNG"));
    }
  },
});

app.use(cors());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Datos iniciales de superhéroes
const superheroes = [
  // Marvel (20 superhéroes)
  {
    name: "Spider-Man",
    realName: "Peter Parker",
    yearAppeared: 1962,
    house: "Marvel",
    biography:
      "Un joven mordido por una araña radiactiva que le otorga habilidades sobrehumanas.",
    equipment: "Lanzatelarañas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Iron Man",
    realName: "Tony Stark",
    yearAppeared: 1963,
    house: "Marvel",
    biography:
      "Genio multimillonario que construye una armadura avanzada para combatir el crimen.",
    equipment: "Armadura de Iron Man",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Thor",
    realName: "Thor Odinson",
    yearAppeared: 1962,
    house: "Marvel",
    biography: "Dios del trueno de Asgard, portador del martillo Mjolnir.",
    equipment: "Mjolnir",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Hulk",
    realName: "Bruce Banner",
    yearAppeared: 1962,
    house: "Marvel",
    biography:
      "Científico transformado en un gigante verde por radiación gamma.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Captain America",
    realName: "Steve Rogers",
    yearAppeared: 1941,
    house: "Marvel",
    biography:
      "Soldado mejorado con el suero del supersoldado, símbolo de libertad.",
    equipment: "Escudo de vibranium",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Black Widow",
    realName: "Natasha Romanoff",
    yearAppeared: 1964,
    house: "Marvel",
    biography: "Espía y asesina entrenada con habilidades excepcionales.",
    equipment: "Armas tácticas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Hawkeye",
    realName: "Clint Barton",
    yearAppeared: 1964,
    house: "Marvel",
    biography: "Arquero experto y miembro de los Vengadores.",
    equipment: "Arco y flechas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Doctor Strange",
    realName: "Stephen Strange",
    yearAppeared: 1963,
    house: "Marvel",
    biography: "Hechicero supremo que protege la Tierra de amenazas místicas.",
    equipment: "Capa de levitación",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Black Panther",
    realName: "T’Challa",
    yearAppeared: 1966,
    house: "Marvel",
    biography:
      "Rey de Wakanda con habilidades mejoradas por la hierba en forma de corazón.",
    equipment: "Traje de vibranium",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Captain Marvel",
    realName: "Carol Danvers",
    yearAppeared: 1968,
    house: "Marvel",
    biography: "Piloto con poderes cósmicos tras exposición a energía Kree.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Ant-Man",
    realName: "Scott Lang",
    yearAppeared: 1962,
    house: "Marvel",
    biography: "Ladrón reformado que usa un traje para cambiar de tamaño.",
    equipment: "Traje de Ant-Man",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Wasp",
    realName: "Hope van Dyne",
    yearAppeared: 1963,
    house: "Marvel",
    biography: "Socia de Ant-Man con habilidades de cambio de tamaño y vuelo.",
    equipment: "Traje de Wasp",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Scarlet Witch",
    realName: "Wanda Maximoff",
    yearAppeared: 1964,
    house: "Marvel",
    biography: "Mutante con poderes de manipulación de la realidad.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Vision",
    realName: "",
    yearAppeared: 1968,
    house: "Marvel",
    biography: "Ser sintético creado por la Gema de la Mente.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Falcon",
    realName: "Sam Wilson",
    yearAppeared: 1969,
    house: "Marvel",
    biography: "Héroe con un traje alado que le permite volar.",
    equipment: "Traje de Falcon",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Winter Soldier",
    realName: "Bucky Barnes",
    yearAppeared: 1941,
    house: "Marvel",
    biography: "Amigo de Captain America convertido en asesino programado.",
    equipment: "Brazo biónico",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Star-Lord",
    realName: "Peter Quill",
    yearAppeared: 1976,
    house: "Marvel",
    biography: "Líder de los Guardianes de la Galaxia con herencia celestial.",
    equipment: "Pistolas elementales",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Gamora",
    realName: "",
    yearAppeared: 1975,
    house: "Marvel",
    biography: "Asesina entrenada y miembro de los Guardianes de la Galaxia.",
    equipment: "Espadas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Drax",
    realName: "Arthur Douglas",
    yearAppeared: 1973,
    house: "Marvel",
    biography: "Guerrero en busca de venganza contra Thanos.",
    equipment: "Cuchillos",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Rocket Raccoon",
    realName: "",
    yearAppeared: 1976,
    house: "Marvel",
    biography: "Mapache genéticamente modificado experto en armas y tácticas.",
    equipment: "Armas de fuego",
    images: ["/images/superheroes.jpg"],
  },
  // DC (20 superhéroes)
  {
    name: "Batman",
    realName: "Bruce Wayne",
    yearAppeared: 1939,
    house: "DC",
    biography:
      "Un vigilante que lucha contra el crimen en Gotham usando su riqueza y habilidades.",
    equipment: "Bati-cinturón, Batimóvil",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Superman",
    realName: "Clark Kent",
    yearAppeared: 1938,
    house: "DC",
    biography:
      "Un alienígena de Krypton con poderes extraordinarios que protege la Tierra.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Wonder Woman",
    realName: "Diana Prince",
    yearAppeared: 1941,
    house: "DC",
    biography: "Princesa amazona con fuerza y habilidades divinas.",
    equipment: "Lazo de la verdad",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "The Flash",
    realName: "Barry Allen",
    yearAppeared: 1956,
    house: "DC",
    biography:
      "El hombre más rápido del mundo, con poderes de velocidad sobrehumana.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Green Lantern",
    realName: "Hal Jordan",
    yearAppeared: 1959,
    house: "DC",
    biography:
      "Miembro del Cuerpo de Linternas Verdes, usa un anillo de poder.",
    equipment: "Anillo de Linterna Verde",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Aquaman",
    realName: "Arthur Curry",
    yearAppeared: 1941,
    house: "DC",
    biography: "Rey de Atlantis con control sobre los mares.",
    equipment: "Tridente de Neptuno",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Cyborg",
    realName: "Victor Stone",
    yearAppeared: 1980,
    house: "DC",
    biography: "Humano mejorado con tecnología cibernética tras un accidente.",
    equipment: "Cuerpo cibernético",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Martian Manhunter",
    realName: "J’onn J’onzz",
    yearAppeared: 1955,
    house: "DC",
    biography: "Marciano con habilidades de cambio de forma y telepatía.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Hawkman",
    realName: "Carter Hall",
    yearAppeared: 1940,
    house: "DC",
    biography: "Héroe alado con habilidades de reencarnación.",
    equipment: "Mazas, alas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Hawkgirl",
    realName: "Shiera Sanders",
    yearAppeared: 1940,
    house: "DC",
    biography: "Compañera de Hawkman con habilidades similares.",
    equipment: "Mazas, alas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Green Arrow",
    realName: "Oliver Queen",
    yearAppeared: 1941,
    house: "DC",
    biography: "Arquero multimillonario que lucha contra el crimen.",
    equipment: "Arco y flechas",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Black Canary",
    realName: "Dinah Lance",
    yearAppeared: 1947,
    house: "DC",
    biography: "Luchadora con un grito sónico devastador.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Zatanna",
    realName: "Zatanna Zatara",
    yearAppeared: 1964,
    house: "DC",
    biography: "Maga con habilidades de lanzar hechizos al hablar al revés.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Shazam",
    realName: "Billy Batson",
    yearAppeared: 1940,
    house: "DC",
    biography: "Niño que se transforma en héroe al decir “Shazam”.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Blue Beetle",
    realName: "Jaime Reyes",
    yearAppeared: 2006,
    house: "DC",
    biography: "Adolescente con una armadura alienígena.",
    equipment: "Escarabajo",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Nightwing",
    realName: "Dick Grayson",
    yearAppeared: 1940,
    house: "DC",
    biography: "Primer Robin que se convirtió en héroe independiente.",
    equipment: "Bastones",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Red Hood",
    realName: "Jason Todd",
    yearAppeared: 1983,
    house: "DC",
    biography: "Antihéroe y antiguo Robin con métodos violentos.",
    equipment: "Armas de fuego",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Batgirl",
    realName: "Barbara Gordon",
    yearAppeared: 1967,
    house: "DC",
    biography: "Hija del comisario Gordon que lucha contra el crimen.",
    equipment: "Bati-equipo",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Supergirl",
    realName: "Kara Zor-El",
    yearAppeared: 1959,
    house: "DC",
    biography: "Prima de Superman con poderes similares.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
  {
    name: "Firestorm",
    realName: "Ronnie Raymond",
    yearAppeared: 1978,
    house: "DC",
    biography: "Héroe con poderes de manipulación de materia.",
    equipment: "",
    images: ["/images/superheroes.jpg"],
  },
];

// Conexión a MongoDB y carga de datos iniciales
mongoose
  .connect(process.env.MONGO_URI || "mongodb://mongodb:27017/superheroes", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Conectado a MongoDB");
    const count = await Superhero.countDocuments();
    if (count === 0) {
      await Superhero.insertMany(superheroes);
      console.log(
        `Datos iniciales cargados: ${superheroes.length} superhéroes`
      );
    } else {
      console.log("La colección ya contiene datos, omitiendo carga inicial");
    }
  })
  .catch((err) => console.error("Error de conexión a MongoDB:", err));

// Rutas
app.get("/api/superheroes", async (req, res) => {
  try {
    const superheroes = await Superhero.find();
    res.json(superheroes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener superhéroes", error: error.message });
  }
});

app.get("/api/superheroes/:house", async (req, res) => {
  try {
    const superheroes = await Superhero.find({ house: req.params.house });
    res.json(superheroes);
  } catch (error) {
    res.status(500).json({
      message: `Error al obtener superhéroes de ${req.params.house}`,
      error: error.message,
    });
  }
});

app.get("/api/superhero/:id", async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero)
      return res.status(404).json({ message: "Superhéroe no encontrado" });
    res.json(superhero);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener superhéroe", error: error.message });
  }
});

app.post("/api/superheroes", upload.array("images", 10), async (req, res) => {
  try {
    const superheroData = {
      name: req.body.name,
      realName: req.body.realName || "",
      yearAppeared: parseInt(req.body.yearAppeared),
      house: req.body.house,
      biography: req.body.biography,
      equipment: req.body.equipment || "",
      images: ["/images/superheroes.jpg"].concat(
        req.files.map((file) => `/uploads/${file.filename}`)
      ),
    };
    const superhero = new Superhero(superheroData);
    await superhero.save();
    res.status(201).json({ message: "Superhéroe creado con éxito", superhero });
  } catch (error) {
    res.status(400).json({
      message: "Error al crear superhéroe",
      error: error.message,
    });
  }
});

app.put("/api/superhero/:id", upload.array("images", 10), async (req, res) => {
  try {
    const superhero = await Superhero.findById(req.params.id);
    if (!superhero)
      return res.status(404).json({ message: "Superhéroe no encontrado" });

    // Parsear imagesToRemove si existe
    let imagesToRemove = [];
    try {
      imagesToRemove = req.body.imagesToRemove
        ? JSON.parse(req.body.imagesToRemove)
        : [];
    } catch (error) {
      return res
        .status(400)
        .json({ message: "Formato inválido para imagesToRemove" });
    }

    // Filtrar imágenes existentes, excluyendo las marcadas para eliminación
    let updatedImages = superhero.images.filter(
      (img) => !imagesToRemove.includes(img)
    );

    // Agregar nuevas imágenes subidas
    if (req.files.length > 0) {
      const newImages = req.files.map((file) => `/uploads/${file.filename}`);
      updatedImages = updatedImages.concat(newImages);
    }

    // Si no hay imágenes, añadir la predeterminada
    if (updatedImages.length === 0) {
      updatedImages = ["/images/superheroes.jpg"];
    }

    // Eliminar imágenes marcadas de /uploads/ (no /images/superheroes.jpg)
    imagesToRemove.forEach((image) => {
      if (image !== "/images/superheroes.jpg") {
        const imagePath = path.join(__dirname, "uploads", path.basename(image));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    });

    // Si se suben nuevas imágenes, eliminar las antiguas de /uploads/ (no /images/superheroes.jpg)
    if (req.files.length > 0) {
      superhero.images.forEach((image) => {
        if (
          image !== "/images/superheroes.jpg" &&
          !imagesToRemove.includes(image)
        ) {
          const oldImagePath = path.join(
            __dirname,
            "uploads",
            path.basename(image)
          );
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
      });
    }

    const superheroData = {
      name: req.body.name,
      realName: req.body.realName || "",
      yearAppeared: parseInt(req.body.yearAppeared),
      house: req.body.house,
      biography: req.body.biography,
      equipment: req.body.equipment || "",
      images: updatedImages,
    };

    const updatedSuperhero = await Superhero.findByIdAndUpdate(
      req.params.id,
      superheroData,
      { new: true, runValidators: true }
    );
    res.json({
      message: "Superhéroe actualizado con éxito",
      superhero: updatedSuperhero,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error al actualizar superhéroe",
      error: error.message,
    });
  }
});

app.delete("/api/superhero/:id", async (req, res) => {
  try {
    const superhero = await Superhero.findByIdAndDelete(req.params.id);
    if (!superhero)
      return res.status(404).json({ message: "Superhéroe no encontrado" });

    // Eliminar imágenes si no son la predeterminada
    superhero.images.forEach((image) => {
      if (image !== "/images/superheroes.jpg") {
        const imagePath = path.join(__dirname, "uploads", path.basename(image));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }
    });

    res.json({ message: "Superhéroe eliminado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar superhéroe",
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
