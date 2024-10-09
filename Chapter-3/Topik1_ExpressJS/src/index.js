const express = require("express"); 
require("express-async-errors");
const fileUpload = require("express-fileupload");
const router = require("./routes"); 
const { errorHandler, notFoundURLHandler } = require("./middlewares/errors");


// Make/instantiate express application
const app = express(); // Create express app
const port = 3000; // Define port

/* We need to activate body parser/reader */
app.use(express.json());

/* We need to read form-body (body parser/reader) if you want upload file */
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    })
);

// All routes define here
app.use("/", router);

// This function is for 404 handle URL
app.use("*", notFoundURLHandler);

// This function is to handle error when API hit, it always be the last middleware
app.use(errorHandler);

// Run the express.js application
app.listen(port, () => {
    // Start server
    console.log(`Server is running on http://localhost:${port}`); // Log message
});
