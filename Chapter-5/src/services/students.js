const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = async (name, nickname) => {
    return studentRepository.getStudents(name, nickname);
};

exports.getStudentById = async (id) => {
    const student = await studentRepository.getStudentById(id);
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }

    return student;
};

exports.createStudent = async (data, file) => {
    // Upload file ot image kit
    if (file?.profile_picture) {
        data.profile_picture = await imageUpload(file.profile_picture);
    }

    // Create the data
    return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
    // find student is exist or not (validate the data)
    const existingStudent = await studentRepository.getStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }    

    if (file?.profile_picture) {
        data.profile_picture = await imageUpload(file.profile_picture);
    } 

    // if exist, we will delete the student data
    const updatedStudent = await studentRepository.updateStudent(id, data);
    if (!updatedStudent) {
        throw new InternalServerError(["Failed to update student!"]);
    }

    return updatedStudent;
};

exports.deleteStudentById = async (id) => {
    // find student is exist or not (validate the data)
    const existingStudent = await studentRepository.getStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }

    // if exist, we will delete the student data
    const deletedStudent = await studentRepository.deleteStudentById(id);
    if (!deletedStudent) {
        throw new InternalServerError(["Failed to delete student!"]);
    }

    return deletedStudent;
};
