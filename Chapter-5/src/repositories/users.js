const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
    const maxUsers = await prisma.users.findFirst({
        orderBy: {
            id: "desc",
        },
    });

    const serializedMaxStudent = JSONBigInt.stringify(maxUsers);
    const parsedMaxUsers = JSONBigInt.parse(serializedMaxStudent);

    // if there is no user, set the id to 1
    const newId = maxUsers ? parsedMaxUsers.id + 1 : 1;

    // encrypt the password
    salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);

    // create the new user
    const newUser = await prisma.users.create({
        data: {
            id: newId,
            ...data,
        },            
    });

    // convert BigInt fields to string for safe serialization
    const serializedUser = JSONBigInt.stringify(newUser);
    return JSONBigInt.parse(serializedUser);
};

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findUnique({
        where: {
            email: email,
        },
    });

    // convert BigInt fields to string for safe serialization
    const serializedUser = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedUser);
};
