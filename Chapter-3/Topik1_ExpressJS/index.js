const express = require('express'); // Import express with non-module
const students = require('./data/students.json'); // Import students data

// Make/instantiate express application
const app = express(); // Create express app
const port = 3000; // Define port

// We need to activate body parser/reader
app.use(express.json()); // Activate body reader

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

app.post('/students', (req, res) => { // Define route
    const {name, nickname, address, education} = req.body; // Get data from request body
    if (!name || name == "") { // If name is empty
        res.status(400).json({
            message: 'Name is required!'
        }); // Send response
        return; // Stop
    }
    if (!nickname || nickname == "") { // If nickname is empty
        res.status(400).json({
            message: 'Nickname is required!'
        }); // Send response
        return; // Stop
    }
    if (!req.body.class || req.body.class == "") { // If class is empty
        res.status(400).json({
            message: 'Class is required'
        }); // Send response
        return; // Stop
    }
    if (!address || address == "") { // If address is empty
        res.status(400).json({
            message: 'Address is required!'
        }); // Send response
        return; // Stop
    }
    if (!education || education == "") { // If education is empty
        res.status(400).json({
            message: 'Education is required!'
        }); // Send response
        return; // Stop
    }

    const { province, city } = address; // Get address data
    if (!province || province == "") {
      // If province is empty
        res.status(400).json({
        message: "Province is required!",
      }); // Send response
      return; // Stop
    }
    if (!city || city == "") { // If city is empty
        res.status(400).json({
            message: 'City is required!'
        }); // Send response
        return; // Stop
    }

    const {bachelor} = education; // Get education data
    if (!bachelor || bachelor == "") { // If bachelor is empty
        res.status(400).json({
            message: 'Bachelor is required!'
        }); // Send response
        return; // Stop
    }

    const id = students.length + 1; // Generate new id
    const newStudent = {
        id,
        name,
        nickname,
        class: req.body.class,
        address: {
            province,
            city,
        },
        education: {
            bachelor,
        },
    }; // Create new student

    students.push(newStudent); // Add new student to students data

    // Save new student to student.json file
    // const fs = require('fs'); // Import fs module
    // fs.writeFileSync('./data/students.json', JSON.stringify(students, null, 2)); // Write students data to file

    // using fs and path module
    const fs = require('fs'); // Import fs module
    const path = require('path'); // Import path module
    const filePath = path.join(__dirname, 'data', 'students.json'); // Define file path
    fs.writeFileSync
    (filePath, JSON.stringify(students, null, 2)); // Write students data to file
    

    res.status(201).json(newStudent); // Send response
});


// Run the express.js application
app.listen(port, () => { // Start server
    console.log(`Server is running on http://localhost:${port}`); // Log message
});
