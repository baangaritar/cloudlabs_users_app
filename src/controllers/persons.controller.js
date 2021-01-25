const personsCtrl = {};

// Models
const Person = require("../models/Person");

personsCtrl.renderPersonForm = (req, res) => {
  res.render("persons/new_person");
};

personsCtrl.createNewPerson = async (req, res) => {
  const { name, lastname, username, email } = req.body;
  const errors = [];
  if (!name) {
    errors.push({ text: "Debes agregar un nombre." });
  }
  if (!lastname) {
    errors.push({ text: "Debes agregar un apellido" });
  }
  if (!username) {
    errors.push({ text: "Debes agregar un nombre de usuario" });
  }
  if (!email) {
    errors.push({ text: "Debes agregar un correo electrónico" });
  }

  let person = await Person.find({ username: username })

  if(person.length > 0) {
    errors.push({ text: "El nombre de usuario ya existe" });
  }

  person = await Person.find({ email: email })

  if(person.length > 0) {
    errors.push({ text: "El correo electrónico ya existe" });
  }

  if (errors.length > 0) {
    res.render("persons/new_person", {
      errors,
      name,
      lastname,
      username,
      email
    });
  } else {
    const newPerson = new Person({ name, lastname, username, email });
    newPerson.created_by = req.user.id;
    await newPerson.save();
    req.flash("success_msg", "Se agregó la persona correctamente");
    res.redirect("/persons");
  }
};

personsCtrl.renderPersons = async (req, res) => {
  const persons = await Person.find({ created_by: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("persons/all_persons", { persons: persons, user: req.user });
};

personsCtrl.renderEditForm = async (req, res) => {
  const person = await Person.findById(req.params.id).lean();
  if (person.created_by != req.user.id) {
    req.flash("error_msg", "Usuario no autorizado");
    return res.redirect("/persons");
  }
  res.render("persons/edit_person", { person });
};

personsCtrl.updatePerson = async (req, res) => {
  const { name, lastname, username, email } = req.body;
  await Person.findByIdAndUpdate(req.params.id, { name, lastname, username, email });
  req.flash("success_msg", "Se actualizó la persona correctamente");
  res.redirect("/persons");
};

personsCtrl.deletePerson = async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Se ha eliminado a la persona");
  res.redirect("/persons");
};

module.exports = personsCtrl;