const express = require("express");
const { authorizations } = require("../middlewares/auth");
const {
    validateGetStudents,
    validateGetStudentById,
    validateDeleteStudentById,
    validateCreateStudent,
    validateUpdateStudent,
} = require("../middlewares/students");
const {
    getStudents,
    getStudentById,
    deleteStudentById,
    createStudent,
    updateStudent,
} = require("../controllers/students");
const { adminRole, userRole } = require("../constants/auth");

const router = express.Router();

// It will be run the URL based on path and the method
router
    .route("/")
    .get(authorizations(adminRole, userRole), validateGetStudents, getStudents)
    .post(authorizations(adminRole), validateCreateStudent, createStudent);

router
    .route("/:id")
    .get(authorizations(adminRole, userRole), validateGetStudentById, getStudentById)
    .put(authorizations(adminRole), validateUpdateStudent, updateStudent)
    .delete(authorizations(adminRole), validateDeleteStudentById, deleteStudentById);

module.exports = router;
