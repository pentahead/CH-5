const UniversitiesService = require("../services/universities");
const { successResponse } = require("../utils/response");

exports.getUniversities = async (req, res, next) => {
  // Call the usecase or service
  const data = await UniversitiesService.getUniversities(
    req.query?.name,
    req.query?.nick_name
  );
  successResponse(res, data);
};

exports.getUniversitiesById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;

  // Get Universities by id
  const data = await UniversitiesService.getUniversitiesById(id);
  successResponse(res, data);
};

exports.createUniversities = async (req, res, next) => {
  // Create the new Universities
  const data = await UniversitiesService.createUniversities(
    req.body,
    req.files
  );
  successResponse(res, data);
};

exports.updateUniversities = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await UniversitiesService.updateUniversities(
    id,
    req.body,
    req.files
  );
  successResponse(res, data);
};

exports.deleteUniversitiesById = async (req, res, next) => {
  // Get the id from params
  const { id } = req.params;
  const data = await UniversitiesService.deleteUniversitiesById(id);
  successResponse(res, data);
};
