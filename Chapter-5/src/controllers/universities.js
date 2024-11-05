const universityService = require("../services/universities");
const { successResponse } = require("../utils/response");

exports.getUniversities = async (req, res, next) => {
    // Call the usecase or service
    const data = await universityService.getUniversitiess();
    successResponse(res, data);
};
