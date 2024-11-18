const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
  validateGetClasses,
  validateGetClassesById,
  validateDeleteClassesById,
  validateCreateClasses,
  validateUpdateClasses,
} = require("../middlewares/classes");
const {
  getClasses,
  getClassesById,
  deleteClassesById,
  createClasses,
  updateClasses,
} = require("../controllers/classes");

const router = express.Router();

// It will be run the URL based on path and the method
router
  .route("/")
  .get(authorization(1, 2), validateGetClasses, getClasses)
  .post(authorization(1), validateCreateClasses, createClasses);

router
  .route("/:id")
  .get(authorization(1, 2), validateGetClassesById, getClassesById)
  .put(authorization(1), validateUpdateClasses, updateClasses)
  .delete(authorization(1), validateDeleteClassesById, deleteClassesById);

module.exports = router;
