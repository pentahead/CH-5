const ClassesService = require("../services/classes");
const { successResponse } = require("../utils/response");

exports.getClasses = async (req, res, next) => {
  // Call the usecase or service
  const data = await ClassesService.getClasses(
    req.query?.name,
    req.query?.nick_name
  );
  successResponse(res, data);
};

exports.getClassesById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get Classes by id
  const data = await ClassesService.getClassesById(id);
  successResponse(res, data);
};

exports.createClasses = async (req, res, next) => {
  // Create the new Classes
  const data = await ClassesService.createClasses(req.body, req.files);
  successResponse(res, data);
};

exports.updateClasses = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await ClassesService.updateClasses(id, req.body, req.files);
  successResponse(res, data);
};

exports.deleteClassesById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await ClassesService.deleteClassesById(id);
  successResponse(res, data);
};
