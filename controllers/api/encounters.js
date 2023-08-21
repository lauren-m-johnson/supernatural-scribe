const Encounter = require('../../models/encounter'); 

// Helper function to handle errors
function handleErrors(res, err) {
  res.status(400).json(err);
}

async function create(req, res) {
  try {
    const newEncounter = await Encounter.create(req.body);
    res.status(201).json(newEncounter);
  } catch (err) {
    handleErrors(res, err);
  }
}

async function list(req, res) {
  try {
    const encounters = await Encounter.find();
    res.json(encounters);
  } catch (err) {
    handleErrors(res, err);
  }
}

module.exports = {
  create,
  list,
};

