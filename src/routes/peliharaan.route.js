// routes/peliharaan.js
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

// Require the authentificateToken middleware
const { authentificateToken } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

// Import your controller or service functions for managing data
const {
  getAllPeliharaan,
  getPeliharaanById,
  createPeliharaan,
  updatePeliharaanById,
  deletePeliharaanById,
  patchPeliharaanById,
} = require("../controllers/peliharaan.controller");

// Validation rules for create and update routes
const createOrUpdateRules = [
  body("nama")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Nama field is required"),
  body("ras")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Ras field is required"),
  body("umur")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Umur field is required"),
  body("jenisKelamin")
    .isIn(["JANTAN", "BETINA"])
    .withMessage("JenisKelamin must be either JANTAN or BETINA"),
  body("jenisPeliharaan")
    .isIn(["KUCING", "ANJING"])
    .withMessage("JenisPeliharaan must be either KUCING or ANJING"),
];

// Routes that require authentication and input validation
router.post("/", authentificateToken, upload.single('file'), createOrUpdateRules, createPeliharaan);
router.put(
  "/:peliharaanId",
  authentificateToken,
  upload.single('file'),
  createOrUpdateRules,
  updatePeliharaanById
);
router.patch(
  "/:peliharaanId",
  authentificateToken,
  upload.single('file'),
  patchPeliharaanById
);

// Routes that require authentication (GET all, GET by ID, DELETE)
router.get("/", authentificateToken, getAllPeliharaan);
router.get("/:peliharaanId", authentificateToken, getPeliharaanById);
router.delete("/:peliharaanId", authentificateToken, deletePeliharaanById);

module.exports = router;
