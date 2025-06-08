const mongoose = require("mongoose");

const superheroSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del superhéroe es obligatorio"],
      trim: true,
    },
    realName: {
      type: String,
      default: "",
      trim: true,
    },
    yearAppeared: {
      type: Number,
      required: [true, "El año de aparición es obligatorio"],
      min: [1900, "El año de aparición debe ser posterior a 1900"],
    },
    house: {
      type: String,
      enum: {
        values: ["Marvel", "DC"],
        message: "La casa debe ser Marvel o DC",
      },
      required: [true, "La casa es obligatoria"],
    },
    biography: {
      type: String,
      required: [true, "La biografía es obligatoria"],
      trim: true,
    },
    equipment: {
      type: String,
      default: "",
      trim: true,
    },
    images: {
      type: [String],
      default: ["/images/superheroes.jpg"],
      required: [true, "Debe haber al menos una imagen"],
      validate: {
        validator: function (array) {
          return array.length > 0;
        },
        message: "Debe haber al menos una imagen",
      },
    },
  },
  {
    timestamps: true,
    collection: "superheroes", // Explicitly set collection name
  }
);

module.exports = mongoose.model("Superhero", superheroSchema);
