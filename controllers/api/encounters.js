const Encounter = require('../../models/encounter'); 

// Helper function to handle errors
function handleErrors(res, err) {
  console.error('Error:', err);
  res.status(400).json(err);
}

async function create(req, res) {
  try {
    const { _id, ...encounterData } = req.body;
    const newEncounter = await Encounter.create({
      ...encounterData,
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

    // Omit the _id field from the request body
    const { _id, ...updatedEncounterData } = updatedData;

    const encounter = await Encounter.findById(encounterId);

    if (!encounter) {
      return res.status(404).json({ error: 'Encounter not found' });
    }

    if (encounter.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this encounter' });
    }

    // Update the encounter's fields with the updated data
    Object.assign(encounter, updatedEncounterData);
    await encounter.save();

    // Re-populate the createdBy field after saving
    const updatedEncounter = await Encounter.findById(encounterId).populate('createdBy');

    res.json(updatedEncounter);
  } catch (err) {
    handleErrors(res, err);
  }
}

async function remove(req, res) {
  try {
    const encounterId = req.params.id;
    const userId = req.user._id;

    const encounter = await Encounter.findById(encounterId);

    if (!encounter) {
      return res.status(404).json({ error: 'Encounter not found' });
    }

    if (encounter.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this encounter' });
    }

    await encounter.remove();
    res.json({ message: 'Encounter deleted successfully' });
  } catch (err) {
    handleErrors(res, err);
  }
}


module.exports = {
  create,
  list,
  edit,
  remove,
};

