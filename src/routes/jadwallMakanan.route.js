const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Require the authentificateToken middleware
const { authentificateToken } = require("../middlewares/auth");

// Import your controller or service functions for managing data
const {
  getAllJadwalMakanan,
  getJadwalMakananById,
  createJadwalMakanan,
  updateJadwalMakananById,
  deleteJadwalMakananById,
  patchJadwalMakananById,
} = require("../controllers/jadwalMakanan.controller");

// Validation rules for create and update routes
const createOrUpdateRules = [
  body("jadwalMakan")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Jadwal Makan field is required"),
  body("userId")
    .trim()
    .isLength({ min: 1 })
    .withMessage("User ID field is required"),
  body("waktu")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Waktu field is required")
    .isISO8601()
    .withMessage("Waktu must be a valid ISO 8601 date and time"),
];

// Routes that require authentication and input validation
router.post("/", authentificateToken, createOrUpdateRules, createJadwalMakanan);
router.put(
  "/:jadwalId",
  authentificateToken,
  createOrUpdateRules,
  updateJadwalMakananById
);
router.patch(
  "/:jadwalId",
  authentificateToken,
  createOrUpdateRules,
  patchJadwalMakananById
);

// Routes that require authentication (GET all, GET by ID, DELETE)
router.get("/", authentificateToken, getAllJadwalMakanan);
router.get("/:jadwalId", authentificateToken, getJadwalMakananById);
router.delete("/:jadwalId", authentificateToken, deleteJadwalMakananById);

module.exports = router;
