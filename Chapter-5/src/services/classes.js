const classRepository = require("../repositories/classes");

exports.getClasses = async () => {
    return classRepository.getClasses();
};
