const Encounter = require('../../models/encounter'); // Adjust the path based on your project structure

module.exports = {
  create: async function(req, res, next) {
    try {
      const newEncounter = await Encounter.create(req.body);
      res.status(201).json(newEncounter);
    } catch (err) {
      next(err);
    }
  },

  list: async function(req, res, next) {
    try {
      const encounters = await Encounter.find();
      res.json(encounters);
    } catch (err) {
      next(err);
    }
  },
};