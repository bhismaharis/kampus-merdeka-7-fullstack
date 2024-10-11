const studentRepository = require("../repositories/students");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getStudents = (name, nickname, bachelor) => {
    return studentRepository.getStudents(name, nickname, bachelor);
};

exports.getStudentById = (id) => {
    const student = studentRepository.getStudentById(id);
    if (!student) {
        throw new NotFoundError("Student is Not Found!");
    }

    return student;
};

exports.createStudent = async (data, file) => {
    // Upload file ot image kit
    if (file?.profilePicture) {
        data.profilePicture = await imageUpload(file.profilePicture);
    }

    // Create the data
    return studentRepository.createStudent(data);
};

exports.updateStudent = async (id, data, file) => {
    // find student is exist or not (validate the data)
    const existingStudent = studentRepository.getStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }
    
    // Replace the existing data with the new data
    data = {
        ...existingStudent,
        ...data,
    };

    if (file?.profilePicture) {
        data.profilePicture = await imageUpload(file.profilePicture);
    } 
    // else {
    //     data.profilePicture = existingStudent.profilePicture;
    // }

    // if exist, we will delete the student data
    const updatedStudent = studentRepository.updateStudent(id, data);
    if (!updatedStudent) {
        throw new InternalServerError(["Failed to update student!"]);
    }

    return updatedStudent;
};

exports.deleteStudentById = (id) => {
    // find student is exist or not (validate the data)
    const existingStudent = studentRepository.getStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }

    // if exist, we will delete the student data
    const deletedStudent = studentRepository.deleteStudentById(id);
    if (!deletedStudent) {
        throw new InternalServerError(["Failed to delete student!"]);
    }

    return deletedStudent;
};
