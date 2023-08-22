const Encounter = require('../../models/encounter'); 

// Helper function to handle errors
function handleErrors(res, err) {
  res.status(400).json(err);
}

async function create(req, res) {
  try {
    const newEncounter = await Encounter.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(newEncounter);
  } catch (err) {
    handleErrors(res, err);
  }
}

async function list(req, res) {
  try {
    const encounters = await Encounter.find().populate('createdBy');
    res.json(encounters);
  } catch (err) {
    handleErrors(res, err);
  }
}

async function edit(req, res) {
  try {
    const encounterId = req.params.id;
    const updatedData = req.body;
    const userId = req.user._id;

    const encounter = await Encounter.findByIdAndUpdate(
      encounterId,
      updatedData,
      { new: true } 
    ).populate('createdBy'); 

    if (!encounter) {
      return res.status(404).json({ error: 'Encounter not found' });
    }

    if (encounter.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this encounter' });
    }

    res.json(encounter);
  } catch (err) {
    handleErrors(res, err);
  }
}


module.exports = {
  create,
  list,
  edit,
};

