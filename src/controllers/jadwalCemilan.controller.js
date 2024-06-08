const { validationResult } = require('express-validator');
const {
  get,
  getById,
  create,
  updateById,
  patchById,
  deleteById,
} = require('../models/jadwalCemilan.model');

// Controller function to get all jadwal makanan
const getAllJadwalCemilan = async (req, res) => {
  try {
    const jadwalCemilan = await get();
    res.json(jadwalCemilan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a jadwal makanan by ID
const getJadwalCemilanById = async (req, res) => {
  const { jadwalId } = req.params;
  try {
    const jadwalCemilan = await getById(parseInt(jadwalId));
    if (!jadwalCemilan) {
      return res.status(404).json({ error: 'Jadwal Cemilanan not found' });
    }
    res.json(jadwalCemilan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new jadwal makanan
const createJadwalCemilan = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const jadwalCemilanData = {
    ...req.body,
    userId: req.user.userUID, // Assuming user ID is stored in req.user.id
  };

  try {
    const createdJadwalCemilan = await create(jadwalCemilanData);
    res.status(201).json(createdJadwalCemilan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a jadwal makanan by ID
const updateJadwalCemilanById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jadwalId } = req.params;
  const jadwalCemilanData = {
    ...req.body,
    userId: req.user.id, // Assuming user ID is stored in req.user.id
  };

  try {
    const updatedJadwalCemilan = await updateById(parseInt(jadwalId), jadwalCemilanData);
    if (!updatedJadwalCemilan) {
      return res.status(404).json({ error: 'Jadwal Cemilanan not found' });
    }
    res.json(updatedJadwalCemilan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const patchJadwalCemilanById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jadwalId } = req.params;
  const jadwalCemilanData = {
    ...req.body,
    userId: req.user.id, // Assuming user ID is stored in req.user.id
  };

  try {
    const updatedJadwalCemilan = await patchById(parseInt(jadwalId), jadwalCemilanData);
    if (!updatedJadwalCemilan) {
      return res.status(404).json({ error: 'Jadwal Cemilanan not found' });
    }
    res.json(updatedJadwalCemilan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a jadwal makanan by ID
const deleteJadwalCemilanById = async (req, res) => {
  const { jadwalId } = req.params;
  try {
    await deleteById(parseInt(jadwalId));
    res.status(204).send(); // No content in response
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllJadwalCemilan,
  getJadwalCemilanById,
  createJadwalCemilan,
  updateJadwalCemilanById,
  patchJadwalCemilanById,
  deleteJadwalCemilanById,
};
