const express = require('express'); // Import express with non-module
const students = require('./data/students.json'); // Import students data

// Make/instantiate express application
const app = express(); // Create express app
const port = 3000; // Define port

// Make a routing and response
app.get('/', (req, res) => { // Define route
    res.send('Hello World!'); // Send response
});

app.get('/students', (req, res) => { // Define route
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

app.get('/students/:id', (req, res) => { 
    // Get the id from params
    const { id } = req.params; // Get id from request
    
    // Find student by id
    const student = students.find((student) => student.id == id);
    // If student has been found, it will be response the student data
    if (student) {
        res.json(student);
        return;
    }

    // if there is no student with the id that client request, it will response not found
    res.status(404).json({message: 'Student not found!'});
});


// Run the express.js application
app.listen(port, () => { // Start server
    console.log(`Server is running on http://localhost:${port}`); // Log message
});
