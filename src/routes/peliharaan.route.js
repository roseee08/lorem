const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Require the authentificateToken middleware
const { authentificateToken } = require("../middlewares/auth");

// Import your controller or service functions for managing data
const {
  getAllPeliharaan,
  getPeliharaanById,
  createPeliharaan,
  updatePeliharaanById,
  deletePeliharaanById,
  patchPeliharaanById,
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
router.post("/", authentificateToken, createOrUpdateRules, createPeliharaan);
router.put(
  "/:jadwalId",
  authentificateToken,
  createOrUpdateRules,
  updatePeliharaanById
);
router.patch(
  "/:jadwalId",
  authentificateToken,
//   createOrUpdateRules,
  patchPeliharaanById
);

// Routes that require authentication (GET all, GET by ID, DELETE)
router.get("/", authentificateToken, getAllPeliharaan);
router.get("/:jadwalId", authentificateToken, getPeliharaanById);
router.delete("/:jadwalId", authentificateToken, deletePeliharaanById);

module.exports = router;
