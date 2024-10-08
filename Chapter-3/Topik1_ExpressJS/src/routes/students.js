const express = require("express");
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

router.get("/", validateGetStudents, getStudents);
router.post("/", validateCreateStudent, createStudent);
router.get("/:id", validateGetStudentById, getStudentById);
router.put("/:id", validateUpdateStudent, updateStudent);
router.delete("/:id", validateDeleteStudentById, deleteStudentById);

module.exports = router;
