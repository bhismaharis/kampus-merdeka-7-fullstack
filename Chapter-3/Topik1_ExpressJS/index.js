const express = require("express"); // Import express with non-module
require("express-async-errors"); // Import express-async-errors module
const students = require("./data/students.json"); // Import students data
const fs = require("fs"); // Import fs module
const { z } = require("zod"); // Import zod module
const e = require("express");
const { error } = require("console");

// Make/instantiate express application
const app = express(); // Create express app
const port = 3000; // Define port

// Standarize the response
const successResponse = (res, data) => {
    res.status(200).json({
        success: true,
        data,
    });
};

class BadRequestError extends Error {
    constructor(errors) {
        super("Validation failed");
        this.errors = errors;
        this.status = 400;    
    };
};

// handle the not found error class
class NotFoundError extends Error {
    constructor(message) {
        if (message) {
            super(message);
        } else {
            super("Data is not found");
        }
        this.status = 404;
    };
};


// We need to activate body parser/reader
app.use(express.json()); // Activate body reader

// Make a routing and response
app.get("/", (req, res) => {
    // Define route
    res.send("Hello World!"); // Send response
});

app.get("/students", (req, res) => {
    // try {
    // students?name=BAMARAMZY -> ramzy
    // Validate the query
    const validateQuery = z.object({
        name: z.string().optional(),
        nickname: z.string().optional(),
        bachelor: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.params);
    if (!resultValidateQuery.success) {
        // If validation fails, return error messages
        // return res.status(400).json({
        //     message: "Validation failed",
        //     errors: resultValidateQuery.error.errors.map((err) => ({
        //         field: err.path[0],
        //         issue: err.message,
        //     })),
        // });
        throw new BadRequestError(resultValidateQuery.error.errors.map);
    }

    const searchedStudent = students.filter((student) => {
        // Do filter logic here
        let result = true;
        if (req.query.name) {
            const isFoundName = student.name
                .toLowerCase()
                .includes(req.query.name.toLowerCase());
            result = result && isFoundName;
        }
        if (req.query.nickname) {
            const isFoundnickname = student.nickname
                .toLowerCase()
                .includes(req.query.nickname.toLowerCase());
            result = result && isFoundnickname;
        }
        if (req.query.bachelor) {
            const isFoundBachelor = student.education.bachelor
                .toLowerCase()
                .includes(req.query.bachelor.toLowerCase());
            result = result && isFoundBachelor;
        }

        return result;
    });
    successResponse(res, searchedStudent);
    // } catch (error) {
    //     next(error);
    // }
});

app.get("/students/:id", (req, res) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        // return res.status(400).json({
        //     message: "Validation failed",
        //     errors: result.error.errors.map((err) => ({
        //         field: err.path[0],
        //         issue: err.message,
        //     })),
        // });
        throw new BadRequestError(result.error.errors.map);
    }

    // Get the id from params
    const { id } = req.params;

    // Find student by id
    const student = students.find((student) => student.id == id);
    if (!student) {
        // If there is no student with the id that client request, it will response not found
        // TODO: make a error class
        throw new NotFoundError("Student not found!");
        // return res.status(404).json({ message: "Student not found!" });
    }

    // If student has been found, it will be response the student data
    successResponse(res, student);
});

app.post("/students", (req, res) => {
    // Define route
    // Make a validation schema
    const validateSchema = z.object({
        name: z.string(),
        nickname: z.string(),
        class: z.string(),
        address: z.object({
            province: z.string(),
            city: z.string(),
        }),
        education: z
            .object({
                bachelor: z.string().optional().nullable(),
            })
            .optional()
            .nullable(),
    });

    // Validate
    const result = validateSchema.safeParse(req.body); // Validate request body
    if (!result.success) {
        // If validation failed
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors.map((err) => ({
                field: err.path[0],
                message: err.message,
            })),
        });
    }

    // Find the max index to defnine the new data id
    const maxId = students.reduce(
        (max, student) => student.id > max && student.id,
        0
    );

    // let max = 0;
    // for (let index = 0; index < students.length; index++) {
    //     if (students[index].id > max) {
    //         max = students[index].id;
    //     }
    // }
    // let max = 0;
    // students.map((student) => {
    //     if (student.id > max) {
    //         max = student.id;
    //     }
    // });

    const newStudent = {
        id: maxId + 1,
        ...req.body,
    };

    students.push(newStudent); // Add new student to students data

    // Save new student to student.json file
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 2),
        "utf-8"
    ); // Write students data to file

    // using path module
    // const path = require('path'); // Import path module
    // const filePath = path.join(__dirname, 'data', 'students.json'); // Define file path
    // fs.writeFileSync
    // (filePath, JSON.stringify(students, null, 2)); // Write students data to file

    successResponse(res, newStudent);
});

// Update a student: PUT /students/:id
app.put("/students/:id", (req, res) => {
    // zod validation
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        // If validation fails, return error messages
        // return res.status(400).json({
        //     message: "Validation failed",
        //     errors: resultValidateParams.error.errors.map((err) => ({
        //         field: err.path[0],
        //         issue: err.message,
        //     })),
        // });
        throw new BadRequestError(resultValidateParams.error.errors.map);
    }

    // Validation body schema
    const validateBody = z.object({
        name: z.string(),
        nickname: z.string(),
        class: z.string(),
        address: z.object({
            province: z.string(),
            city: z.string(),
        }),
        education: z
            .object({
                bachelor: z.string().optional().nullable(),
            })
            .optional()
            .nullable(),
    });

    // Validate
    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        // return res.status(400).json({
        //     message: "Validation failed",
        //     errors: resultValidateBody.error.errors.map((err) => ({
        //         field: err.path[0],
        //         issue: err.message,
        //     })),
        // });
        throw new BadRequestError(resultValidateBody.error.errors.map);
    }

    // Find the existing student data
    const id = Number(req.params.id);
    const student = students.find((student) => student.id === id);
    if (!student) {
        // TODO: make a error class
        // return res.status(404).json({
        //     message: "Student not found!",
        // });
        throw new NotFoundError("Student not found!");
    }

    // Update the data
    Object.assign(student, resultValidateBody.data);

    // Update the json data
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    successResponse(res, student);
});

// Delete a student: DELETE /students/:id using zod
app.delete("/students/:id", (req, res) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        // return res.status(400).json({
        //     message: "Validation failed",
        //     errors: result.error.errors.map((err) => ({
        //         field: err.path[0],
        //         issue: err.message,
        //     })),
        // });
        throw new BadRequestError(result.error.errors.map);
    }

    // Get the id from params
    const { id } = req.params;

    // Find index
    const studentIndex = students.findIndex((student) => student.id == id);

    // If the index found
    if (studentIndex < 0) {
        // If no index found
        // return res.status(404).json({ message: "Student not found!" });
        throw new NotFoundError("Student not found!");
    }

    // If the index found
    const deletedStudent = students.splice(studentIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    successResponse(res, deletedStudent);
});

// This function is to handle error when API hit
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const errors = err.errors || [];
    let message = err.message;
    if (status == 500) {
        message = "Internal Server Error";
    }

    res.status(status).json({
        success: false,
        data: null,
        message,
        errors,
    });
});

// Run the express.js application
app.listen(port, () => {
    // Start server
    console.log(`Server is running on http://localhost:${port}`); // Log message
});
