const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const students = require("../../data/students.json");

const prisma = new PrismaClient();

exports.getStudents = async (name, nickname) => {
    // Define the query
    let query = {
        // akan menghasilkan query
        include: {
            classes: {
                select: {
                    id: false,
                    class: true,
                    description: true,
                },
            },
            universities: {
                select: {
                    id: false,
                    name: true,
                    description: true,
                    city: true,
                    country: true,
                },
            },
        },
    };

    // it will generate the query
    let orQuery = [];
    if (name) {
        orQuery.push({
            name: {
                contains: name,
                mode: "insensitive",
            },
        });
    }
    if (nickname) {
        orQuery.push({
            nick_name: {
                contains: nickname,
                mode: "insensitive",
            },
        });
    }
    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery,
        };
    }

    // find the query
    const searchedStudents = await prisma.students.findMany(query);

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(searchedStudents);
    return JSONBigInt.parse(serializedStudents);
};

exports.getStudentById = async (id) => {
    // find student by id
    const student = await prisma.students.findFirst({
        where: {
            id: id,
        },
        include: {
            classes: {
                select: {
                    id: false,
                    class: true,
                    description: true,
                },
            },
            universities: {
                select: {
                    id: false,
                    name: true,
                    description: true,
                    city: true,
                    country: true,
                },
            },
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(student);
    return JSONBigInt.parse(serializedStudents);
};

exports.createStudent = async (data) => {
    const newStudent = await prisma.students.create({
        data: {
            ...data,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(newStudent);
    return JSONBigInt.parse(serializedStudents);
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
