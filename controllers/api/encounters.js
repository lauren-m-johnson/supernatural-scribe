const Encounter = require('../../models/encounter'); 

// Helper function to handle errors by logging and sending an error response
function handleErrors(res, err) {
  console.error('Error:', err);
  res.status(400).json(err);
}

// Create a new encounter
async function create(req, res) {
  try {
    // Extract encounter data from request body, excluding user ID (_id)
    const { _id, ...encounterData } = req.body;

    // Create a new encounter with the encounter data and the user who created it
    const newEncounter = await Encounter.create({
      ...encounterData,
      createdBy: req.user._id, // Assign the ID of the user who created the encounter
    });

    // Respond with the created encounter
    res.status(201).json(newEncounter);
  } catch (err) {
    handleErrors(res, err);
  }
}

// List all encounters
async function list(req, res) {
  try {
    // Retrieve all encounters from the database and populate the 'createdBy' field with user data
    const encounters = await Encounter.find().populate('createdBy');

    // Respond with the list of encounters
    res.json(encounters);
  } catch (err) {
    handleErrors(res, err);
  }
}

// Edit an existing encounter
async function edit(req, res) {
  try {
    // Extract encounter ID from URL parameters
    const encounterId = req.params.id;

    // Extract updated data from request body, excluding encounter ID (_id)
    const updatedData = req.body;
    const userId = req.user._id;
    const { _id, ...updatedEncounterData } = updatedData;

    // Find the existing encounter by ID
    const encounter = await Encounter.findById(encounterId);

    // Check if the encounter exists
    if (!encounter) {
      return res.status(404).json({ error: 'Encounter not found' });
    }

    // Check if the user attempting to edit is the creator of the encounter
    if (encounter.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this encounter' });
    }

    // Update the encounter's fields with the updated data
    Object.assign(encounter, updatedEncounterData);
    await encounter.save();

    // Re-populate the createdBy field after saving and respond with the updated encounter
    const updatedEncounter = await Encounter.findById(encounterId).populate('createdBy');
    res.json(updatedEncounter);
    
  } catch (err) {
    handleErrors(res, err);
  }
}

// Remove an encounter
async function remove(req, res) {
  try {
    // Extract encounter ID from URL parameters
    const encounterId = req.params.id;
    const userId = req.user._id;

    // Find the existing encounter by ID
    const encounter = await Encounter.findById(encounterId);

    // Check if the encounter exists
    if (!encounter) {
      return res.status(404).json({ error: 'Encounter not found' });
    }

    // Check if the user attempting to delete is the creator of the encounter
    if (encounter.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ error: 'Unauthorized to delete this encounter' });
    }

    // Remove the encounter from the database and respond with a success message
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
