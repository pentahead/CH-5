const express = require("express");
const carsController = require("../controllers/carsController");
const carsValidation = require("../middlewares/carsValidation");
const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constant/auth");


const router = express.Router();

router
  .route("/")
  .get(
    authorization(adminRole, userRole),
    carsValidation.validateGetCars,
    carsController.getCars
  )
  .post(
    authorization(adminRole),
    carsValidation.validateCreateCar,
    carsController.createCar
  );
router
  .route("/:id")
  .get(
    authorization(adminRole, userRole),
    carsValidation.validateGetCarById,
    carsController.getCarById
  )
  .put(
    authorization(adminRole),
    carsValidation.validateUpdateCarById,
    carsController.updateCarById
  )
  .delete(
    authorization(adminRole),
    carsValidation.validateDeleteCarById,
    carsController.deleteCarById
  );

module.exports = router;
