const studentService = require("../services/students");
const { successResponse } = require("../utils/response");

exports.getStudents = (req, res, next) => {
    // Call the usecase or service
    const data = studentService.getStudents(
        req.query?.name,
        req.query?.nickname,
        req.query?.bachelor
    );
    successResponse(res, data);
};

exports.getStudentById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = studentService.getStudentById(id);
    successResponse(res, data);
};

exports.createStudent = async (req, res, next) => {
    // Convert to student data format
    const requestBody = {
        ...req.body,
        address: {
            city: req.body["address.city"],
            province: req.body["address.province"],
        },
        education: {
            bachelor: req.body["education.bachelor"],
        },
    };
    delete requestBody["address.city"];
    delete requestBody["address.province"];
    delete requestBody["education.bachelor"];

    // Create the new student
    const data = await studentService.createStudent(requestBody, req.files);
    successResponse(res, data);
};

exports.updateStudent = async (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    
    const requestBody = {
        ...req.body,
        address: {
            city: req.body["address.city"],
            province: req.body["address.province"],
        },
        education: {
            bachelor: req.body["education.bachelor"],
        },
    };
    delete requestBody["address.city"];
    delete requestBody["address.province"];
    delete requestBody["education.bachelor"];


    const data = await studentService.updateStudent(id, requestBody, req.files);
    successResponse(res, data);
};

exports.deleteStudentById = (req, res, next) => {
    // Get the id from params
    const { id } = req.params;
    const data = studentService.deleteStudentById(id);
    successResponse(res, data);
};
