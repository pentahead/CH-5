const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetUniversities,
  validateGetUniversitiesById,
  validateDeleteUniversitiesById,
  validateCreateUniversities,
  validateUpdateUniversities,
} = require("../middlewares/universities");
const {
  getUniversities,
  getUniversitiesById,
  deleteUniversitiesById,
  createUniversities,
  updateUniversities,
} = require("../controllers/universities");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(1, 2), validateGetUniversities, getUniversities)
  .post(authorization(1), validateCreateUniversities, createUniversities);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetUniversitiesById, getUniversitiesById)
  .put(authorization(1), validateUpdateUniversities, updateUniversities)
  .delete(
    authorization(1),
    validateDeleteUniversitiesById,
    deleteUniversitiesById
  );

module.exports = router;
