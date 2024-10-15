const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

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
    // Find the student with the highest ID
    const maxStudent = await prisma.students.findFirst({
        orderBy: {
            id: "desc",
        },
    });

    const serializedMaxStudent = JSONBigInt.stringify(maxStudent);
    const parsedMaxStudent = JSONBigInt.parse(serializedMaxStudent);

    // Generate the new ID based on the maximum existing ID
    const newId = parsedMaxStudent ? parsedMaxStudent.id + 1 : 1;

    const newStudent = await prisma.students.create({
        data: {
            id: newId,
            ...data,
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
    const serializedStudents = JSONBigInt.stringify(newStudent);
    return JSONBigInt.parse(serializedStudents);
};

exports.updateStudent = async (id, data) => {
    const updatedStudent = await prisma.students.update({
        where: {
            id: id,
        },
        data: {
            ...data,
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
    const serializedStudents = JSONBigInt.stringify(updatedStudent);
    return JSONBigInt.parse(serializedStudents);
};

exports.deleteStudentById = async (id) => {
    const deletedStudent = await prisma.students.delete({
        where: {
            id: id,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedStudents = JSONBigInt.stringify(deletedStudent);
    return JSONBigInt.parse(serializedStudents);
};
