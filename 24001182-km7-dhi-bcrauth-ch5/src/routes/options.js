const express = require("express");
const optionsController = require("../controllers/optionsController");
const optionsValidation = require("../middlewares/optionsValidation");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");
const router = express.Router();

router
  .route("/")
  .get(authorization(adminRole, userRole), optionsValidation.validateGetOptions, optionsController.getOptions)
  .post(authorization(adminRole), 
    optionsValidation.validateCreateOptions,
    optionsController.createOptions
  );

router
  .route("/:id")
  .get(authorization(adminRole, userRole), 
    optionsValidation.validateGetOptionsById,
    optionsController.getOptionsById
  )
  .put(authorization(adminRole), optionsValidation.validateUpdateOptions, optionsController.updateOptions)
  .delete(authorization(adminRole), 
    optionsValidation.validateDeleteOptionsById,
    optionsController.deleteOptionsById
  );

module.exports = router;
