const authService = require("../services/auth");
const {successResponse} = require("../utils/response");

exports.register = async (req, res, next) => {
  const data = await authService.register(req.body, req.files);
  successResponse(res, data);
};

exports.login = async (req, res, next) => {
  const data = await authService.login(req.body, req.files);
  successResponse(res, data);
};