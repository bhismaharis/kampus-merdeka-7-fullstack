const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getClasses = async () => {
    // Find by query
    const searchedClasses = await prisma.classes.findMany();

    // Convert BigInt fields to string for safe serialization
    const serializedClasses = JSONBigInt.stringify(searchedClasses);
    return JSONBigInt.parse(serializedClasses);
};
