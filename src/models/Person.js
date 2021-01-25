const { Schema, model } = require("mongoose");

const PersonSchema = new Schema({
  name: { type: String },
  lastname: { type: String },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  created_at: { type: Date, default: Date.now },
  created_by: { type: String, required: true}
});

module.exports = model("Person", PersonSchema);