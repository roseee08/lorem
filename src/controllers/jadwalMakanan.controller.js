const { validationResult } = require('express-validator');
const {
  get,
  getById,
  create,
  updateById,
  deleteById,
} = require('../models/jadwalMakanan.model');

// Controller function to get all jadwal makanan
const getAllJadwalMakanan = async (req, res) => {
  try {
    const jadwalMakanan = await get();
    res.json(jadwalMakanan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a jadwal makanan by ID
const getJadwalMakananById = async (req, res) => {
  const { jadwalId } = req.params;
  try {
    const jadwalMakanan = await getById(parseInt(jadwalId));
    if (!jadwalMakanan) {
      return res.status(404).json({ error: 'Jadwal Makanan not found' });
    }
    res.json(jadwalMakanan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new jadwal makanan
const createJadwalMakanan = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const jadwalMakananData = req.body;
  try {
    const createdJadwalMakanan = await create(jadwalMakananData);
    res.status(201).json(createdJadwalMakanan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to update a jadwal makanan by ID
const updateJadwalMakananById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { jadwalId } = req.params;
  const jadwalMakananData = req.body;
  try {
    const updatedJadwalMakanan = await updateById(parseInt(jadwalId), jadwalMakananData);
    if (!updatedJadwalMakanan) {
      return res.status(404).json({ error: 'Jadwal Makanan not found' });
    }
    res.json(updatedJadwalMakanan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const patchJadwalMakananById = async (req, res) => {
    const { jadwalId } = req.params;
    const jadwalMakananData = req.body;
    try {
      const updatedJadwalMakanan = await patchById(
        parseInt(jadwalId),
        jadwalMakananData
      );
      if (!updatedJadwalMakanan) {
        return res.status(404).json({ error: "Jadwal Makanan not found" });
      }
      res.json(updatedJadwalMakanan);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// Controller function to delete a jadwal makanan by ID
const deleteJadwalMakananById = async (req, res) => {
  const { jadwalId } = req.params;
  try {
    await deleteById(parseInt(jadwalId));
    res.status(204).send(); // No content in response
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllJadwalMakanan,
  getJadwalMakananById,
  createJadwalMakanan,
  updateJadwalMakananById,
  patchJadwalMakananById,
  deleteJadwalMakananById,
};
