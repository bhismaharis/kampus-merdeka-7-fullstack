const studentRepository = require('../repositories/students');
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

exports.createStudent = (data) => {
    return studentRepository.createStudent(data);
};

exports.updateStudent = (id, data) => {
    // find student is exist or not (validate the data)
    const existingStudent = studentRepository.getStudentById(id);
    if (!existingStudent) {
        throw new NotFoundError("Student is Not Found!");
    }

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