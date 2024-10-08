const students = require("../../data/students.json");
const fs = require("fs");

exports.getStudents = (name, nickname, bachelor) => {
    const searchedStudent = students.filter((student) => {
        // Do filter logic here
        let result = true;
        if (name) {
            const isFoundName = student.name
                .toLowerCase()
                .includes(name.toLowerCase());
            result = result && isFoundName;
        }
        if (nickname) {
            const isFoundnickname = student.nickname
                .toLowerCase()
                .includes(nickname.toLowerCase());
            result = result && isFoundnickname;
        }
        if (bachelor) {
            const isFoundBachelor = student.education.bachelor
                .toLowerCase()
                .includes(bachelor.toLowerCase());
            result = result && isFoundBachelor;
        }
        return result;
    });
    return searchedStudent;
};

exports.getStudentById = (id) => {
    const student = students.find((student) => student.id == id);
    return student;
};

exports.createStudent = (data) => {
    // Find the max index to defnine the new data id
    const maxId = students.reduce(
        (max, student) => student.id > max && student.id,
        0
    );

    const newStudent = {
        id: maxId + 1,
        ...data,
    };

    /* Add data to current array students */
    students.push(newStudent);

    // Save the latest data to json
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    return newStudent;
};

exports.updateStudent = (id, data) => {
    // Find the existing student data
    const student = students.find((student) => student.id === Number(id));
    if (!student) {
        // Make a error class
        throw new NotFoundError("Student is Not Found!");
    }

    // Update the data
    Object.assign(student, data);

    // Update the json data
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );

    return student;
};

exports.deleteStudentById = (id) => {
    // Find index
    const studentIndex = students.findIndex((student) => student.id == id);

    if (studentIndex < 0) {
        // If no index found
        return null;
    }

    const deletedStudent = students.splice(studentIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/students.json",
        JSON.stringify(students, null, 4),
        "utf-8"
    );
    return deletedStudent;
};
