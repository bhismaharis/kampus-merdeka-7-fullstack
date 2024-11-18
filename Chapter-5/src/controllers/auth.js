const authServices = require("../services/auth");
const { successResponse } = require("../utils/response");

exports.register = async (req, res, next) => {
    const data = await authServices.register(req.body, req.files);
    successResponse(res, data);
};

exports.login = async (req, res, next) => {
    const data = await authServices.login(req.body);
    successResponse(res, data);
};

exports.googleLogin = async (req, res, next) => {
    const data = await authServices.googleLogin(req.body.access_token);
    successResponse(res, data);
};

exports.getProfile = async (req, res, next) => {
    const data = req.user;
    delete data.password;
    successResponse(res, data);
};
