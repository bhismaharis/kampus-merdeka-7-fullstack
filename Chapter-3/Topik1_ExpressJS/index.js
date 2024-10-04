const express = require("express"); // Import express with non-module
const students = require("./data/students.json"); // Import students data
const fs = require("fs"); // Import fs module
const { z } = require("zod"); // Import zod module
const e = require("express");

// Make/instantiate express application
const app = express(); // Create express app
const port = 3000; // Define port

// We need to activate body parser/reader
app.use(express.json()); // Activate body reader

// Make a routing and response
app.get("/", (req, res) => {
    // Define route
    res.send("Hello World!"); // Send response
});

app.get("/students", (req, res) => {
    // Define route
    res.send(students); // Send response
});

// app.get('/students/:id', (req, res) => { // Define route
//     const student = students.find((student) => student.id === parseInt(req.params.id)); // Find student by id
//     if (!student) { // If student not found
//         res.status(404).send('Student not found!'); // Send response
//     } else { // If student found
//         res.send(student); // Send response
//     }
// });

app.get("/students/:id", (req, res) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors.map((err) => ({
                field: err.path[0],
                issue: err.message,
            })),
        });
    }

    // Get the id from params
    const { id } = req.params;

    // Find student by id
    const student = students.find((student) => student.id == id);
    // If student has been found, it will be response the student data
    if (student) {
        res.json(student);
        return;
    }

    // if there is no student with the id that client request, it will response not found
    res.status(404).json({ message: "Student not found!" });
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
        id: students.length + 1, // Generate new id
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

    res.status(201).json(newStudent); // Send response
});


// TODO: Update a student: PUT /students/:id
app.put("/students/:id", (req, res) => {
    // TODO: zod validation
    // TODO: Update the data
    // TODO: Update the json data
});

// TODO: Delete a stdudent: DELETE /students/:id using zod
app.delete("/students/:id", (req, res) => {
    // Make a validation schema
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        // If validation fails, return error messages
        return res.status(400).json({
            message: "Validation failed",
            errors: result.error.errors.map((err) => ({
                field: err.path[0],
                issue: err.message,
            })),
        });
    }

    // Get the id from params
    const { id } = req.params;

    // Find index
    const studentIndex = students.findIndex((student) => student.id == id);

    // If the index found
    if (studentIndex >= 0) {
        const deletedStudent = students.splice(studentIndex, 1);

        // Update the json
        fs.writeFileSync(
            "./data/students.json",
            JSON.stringify(students, null, 4),
            "utf-8"
        );

        return res
            .status(200)
            .json({ message: "Success", data: deletedStudent });
    }

    // If no index found
    res.status({ message: "Student not found!" });
});

// Run the express.js application
app.listen(port, () => {
    // Start server
    console.log(`Server is running on http://localhost:${port}`); // Log message
});
