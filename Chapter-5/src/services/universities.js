const universityRepository = require("../repositories/universities");

exports.getUniversitiess = async (name, nickName) => {
    return universityRepository.getUniversities();
};
