const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Require the authentificateToken middleware
const { authentificateToken } = require("../middlewares/auth");

// Import your controller or service functions for managing data
const {
  getAllJadwalMain,
  getJadwalMainById,
  createJadwalMain,
  updateJadwalMainById,
  deleteJadwalMainById,
  patchJadwalMainById,
} = require("../controllers/jadwalMain.controller");

// Validation rules for create and update routes
const createOrUpdateRules = [
  body("jadwalMain")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Jadwal Main field is required"),
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
router.post("/", authentificateToken, createOrUpdateRules, createJadwalMain);
router.put(
  "/:jadwalId",
  authentificateToken,
  createOrUpdateRules,
  updateJadwalMainById
);
router.patch(
  "/:jadwalId",
  authentificateToken,
//   createOrUpdateRules,
  patchJadwalMainById
);

// Routes that require authentication (GET all, GET by ID, DELETE)
router.get("/", authentificateToken, getAllJadwalMain);
router.get("/:jadwalId", authentificateToken, getJadwalMainById);
router.delete("/:jadwalId", authentificateToken, deleteJadwalMainById);

module.exports = router;
