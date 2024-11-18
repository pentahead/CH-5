const authService = require("../services/auth");
const { successResponse } = require("../utils/response");

exports.register = async (req, res, next) => {
  const data = await authService.register(req.body, req.files);
  successResponse(res, { message: "Account Succcesfully Registered", data });
};

exports.login = async (req, res, next) => {
  const data = await authService.login(req.body);
  successResponse(res, {
    message: "Succcesfully loggedin!",
    data,
  });
};

exports.profile = async (req, res, next) => {
  const data = req.user;

  delete data.password;

  successResponse(res, data);
};

exports.googleLogin = async (req, res, next) => {
  const data = await authService.googleLogin(req.body.access_token);
  successResponse(res, data);
};