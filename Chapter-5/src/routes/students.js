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

const router = express.Router();

// It will be run the URL based on path and the method
router
    .route("/")
    .get(authorizations(1, 2), validateGetStudents, getStudents)
    .post(authorizations(1), validateCreateStudent, createStudent);

router
    .route("/:id")
    .get(authorizations(1, 2), validateGetStudentById, getStudentById)
    .put(authorizations(1), validateUpdateStudent, updateStudent)
    .delete(authorizations(1), validateDeleteStudentById, deleteStudentById);

module.exports = router;
