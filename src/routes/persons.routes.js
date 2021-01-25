const express = require("express");
const router = express.Router();

// Controller
const {
  renderPersonForm,
  createNewPerson,
  renderPersons,
  renderEditForm,
  updatePerson,
  deletePerson
} = require("../controllers/persons.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

// New Person
router.get("/persons/add", isAuthenticated, renderPersonForm);

router.post("/persons/new-person", isAuthenticated, createNewPerson);

// Get All Persons
router.get("/persons", isAuthenticated, renderPersons);

// Edit Persons
router.get("/persons/edit/:id", isAuthenticated, renderEditForm);

router.put("/persons/edit-person/:id", isAuthenticated, updatePerson);

// Delete Notes
router.delete("/persons/delete/:id", isAuthenticated, deletePerson);

module.exports = router;