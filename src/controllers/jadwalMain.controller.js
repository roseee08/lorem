const { validationResult } = require('express-validator');
const {
  get,
  getById,
  create,
  updateById,
  patchById,
  deleteById,
} = require('../models/jadwalMain.model');

// Controller function to get all jadwal makanan
const getAllJadwalMain = async (req, res) => {
  try {
    const jadwalMain = await get();
    res.json(jadwalMain);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a jadwal makanan by ID
const getJadwalMainById = async (req, res) => {
  const { jadwalId } = req.params;
  try {
    const jadwalMain = await getById(parseInt(jadwalId));
    if (!jadwalMain) {
      return res.status(404).json({ error: 'Jadwal Mainan not found' });
    }
    res.json(jadwalMain);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new jadwal makanan
const createJadwalMain = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const jadwalMainData = {
    ...req.body,
    userId: req.user.userUID, // Assuming user ID is stored in req.user.id
  };

  try {
    const createdJadwalMain = await create(jadwalMainData);
    res.status(201).json(createdJadwalMain);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a jadwal makanan by ID
const updateJadwalMainById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jadwalId } = req.params;
  const jadwalMainData = {
    ...req.body,
    userId: req.user.id, // Assuming user ID is stored in req.user.id
  };

  try {
    const updatedJadwalMain = await updateById(parseInt(jadwalId), jadwalMainData);
    if (!updatedJadwalMain) {
      return res.status(404).json({ error: 'Jadwal Mainan not found' });
    }
    res.json(updatedJadwalMain);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const patchJadwalMainById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jadwalId } = req.params;
  const jadwalMainData = {
    ...req.body,
    userId: req.user.id, // Assuming user ID is stored in req.user.id
  };

  try {
    const updatedJadwalMain = await patchById(parseInt(jadwalId), jadwalMainData);
    if (!updatedJadwalMain) {
      return res.status(404).json({ error: 'Jadwal Mainan not found' });
    }
    res.json(updatedJadwalMain);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a jadwal makanan by ID
const deleteJadwalMainById = async (req, res) => {
  const { jadwalId } = req.params;
  try {
    await deleteById(parseInt(jadwalId));
    res.status(204).send(); // No content in response
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllJadwalMain,
  getJadwalMainById,
  createJadwalMain,
  updateJadwalMainById,
  patchJadwalMainById,
  deleteJadwalMainById,
};
