const Encounter = require('../../models/encounter'); // Adjust the path based on your project structure

async function create(req, res) {
  try {
    const newEncounter = new Encounter(req.body);
    await newEncounter.save();

    res.status(201).json({ id: newEncounter._id });
  } catch (error) {
    res.status(400).json(error);
  }
}

async function list(req, res) {
  try {
    const encounters = await Encounter.find();
    res.status(200).json(encounters);
  } catch (error) {
    res.status(400).json(error);
  }
}

module.exports = {
  create,
  list,
};