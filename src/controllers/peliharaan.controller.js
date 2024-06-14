const { validationResult } = require('express-validator');
const { get, getById, create, updateById, patchById, deleteById } = require('../models/peliharaan.model');
const { uploadImage, deleteImage } = require('../utils/uploadImage'); // Import fungsi uploadImage dan deleteImage

// Controller function to get all jadwal makanan
const getAllPeliharaan = async (req, res) => {
  try {
    const peliharaan = await get();
    res.json(peliharaan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a jadwal makanan by ID
const getPeliharaanById = async (req, res) => {
  const { peliharaanId } = req.params;
  try {
    const peliharaan = await getById(parseInt(peliharaanId));
    if (!peliharaan) {
      return res.status(404).json({ error: 'Peliharaan not found' });
    }
    res.json(peliharaan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to create a new peliharaan
const createPeliharaan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { file } = req; // Asumsikan file dikirim melalui form-data dengan field 'file'
  let fotoPeliharaanUrl = '';

  if (file) {
    try {
      fotoPeliharaanUrl = await uploadImage(file);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Gagal mengunggah gambar' });
    }
  }

  const peliharaanData = {
    ...req.body,
    fotoPeliharaan: fotoPeliharaanUrl,
    userId: req.user.userUID, // Asumsikan ID pengguna disimpan di req.user.userUID
  };

  try {
    const createdPeliharaan = await create(peliharaanData);
    res.status(201).json(createdPeliharaan);
  } catch (error) {
    res.status(500).json({ error: 'Kesalahan Server Internal' });
  }
};

// Controller function to update a jadwal makanan by ID
const updatePeliharaanById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { peliharaanId } = req.params;
  const { nama, umur, jenisKelamin, jenisPeliharaan, slogan } = req.body;
  const file = req.file; // Asumsikan file dikirim melalui form-data dengan field 'file'

  try {
    const existingPeliharaan = await getById(parseInt(peliharaanId));
    if (!existingPeliharaan) {
      return res.status(404).json({ error: 'Peliharaan not found' });
    }

    let fotoPeliharaanURL = existingPeliharaan.fotoPeliharaan;
    if (file) {
      // Upload new image and delete the old one
      const newImageURL = await uploadImage(file);
      await deleteImage(fotoPeliharaanURL);
      fotoPeliharaanURL = newImageURL;
    }

    const updatedPeliharaan = await updateById(parseInt(peliharaanId), {
      nama,
      umur,
      jenisKelamin,
      jenisPeliharaan,
      slogan,
      fotoPeliharaan: fotoPeliharaanURL,
      userId: req.user.userUID,
    });

    res.json(updatedPeliharaan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const patchPeliharaanById = async (req, res) => {
  // Validate inputs using Express Validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { peliharaanId } = req.params;
  const peliharaanData = {
    ...req.body,
    // umur: parseInt(req.body.umur, 10), // Convert umur to integer
    userId: req.user.userUID, // Assuming user ID is stored in req.user.id
  };

  try {
    const updatedPeliharaan = await patchById(parseInt(peliharaanId), peliharaanData);
    if (!updatedPeliharaan) {
      return res.status(404).json({ error: 'Peliharaan not found' });
    }
    res.json(updatedPeliharaan);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to delete a jadwal makanan by ID
const deletePeliharaanById = async (req, res) => {
  const { peliharaanId } = req.params;
  try {
    const existingPeliharaan = await getById(parseInt(peliharaanId));
    if (!existingPeliharaan) {
      return res.status(404).json({ error: 'Peliharaan not found' });
    }

    console.log(existingPeliharaan.fotoPeliharaan)
    await deleteImage(existingPeliharaan.fotoPeliharaan);
    await deleteById(parseInt(peliharaanId));

    res.status(204).send(); // No content in response
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllPeliharaan,
  getPeliharaanById,
  createPeliharaan,
  updatePeliharaanById,
  patchPeliharaanById,
  deletePeliharaanById,
};
