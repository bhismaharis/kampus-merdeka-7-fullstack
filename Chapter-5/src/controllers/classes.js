const classService = require("../services/classes");
const { successResponse } = require("../utils/response");

exports.getClasses = async (req, res, next) => {
    // Call the usecase or service
    const data = await classService.getClasses();
    successResponse(res, data);
};
