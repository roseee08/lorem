const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Require the authentificateToken middleware
const { authentificateToken } = require("../middlewares/auth");

// Import your controller or service functions for managing data
const {
  getAllJadwalCemilan,
  getJadwalCemilanById,
  createJadwalCemilan,
  updateJadwalCemilanById,
  deleteJadwalCemilanById,
  patchJadwalCemilanById,
} = require("../controllers/jadwalCemilan.controller");

// Validation rules for create and update routes
const createOrUpdateRules = [
  body("jadwalCemilan")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Jadwal Cemilan field is required"),
  // body("userId")
  //   .trim()
  //   .isLength({ min: 1 })
  //   .withMessage("User ID field is required"),
  body("waktu")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Waktu field is required")
    .isISO8601()
    .withMessage("Waktu must be a valid ISO 8601 date and time"),
];

// Routes that require authentication and input validation
router.post("/", authentificateToken, createOrUpdateRules, createJadwalCemilan);
router.put(
  "/:jadwalId",
  authentificateToken,
  createOrUpdateRules,
  updateJadwalCemilanById
);
router.patch(
  "/:jadwalId",
  authentificateToken,
//   createOrUpdateRules,
  patchJadwalCemilanById
);

// Routes that require authentication (GET all, GET by ID, DELETE)
router.get("/", authentificateToken, getAllJadwalCemilan);
router.get("/:jadwalId", authentificateToken, getJadwalCemilanById);
router.delete("/:jadwalId", authentificateToken, deleteJadwalCemilanById);

module.exports = router;
