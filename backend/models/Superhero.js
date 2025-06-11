const mongoose = require("mongoose");
const superheroSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    realName: { type: String },
    yearAppeared: { type: Number, required: true },
    house: { type: String, required: true, enum: ["Marvel", "DC"] },
    biography: { type: String, required: true },
    equipment: { type: String },
    images: [{ type: String, required: true }],
  },
  { collection: "superheroes" }
);
module.exports = mongoose.model("Superhero", superheroSchema);
