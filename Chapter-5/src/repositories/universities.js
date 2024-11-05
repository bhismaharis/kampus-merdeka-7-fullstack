const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const prisma = new PrismaClient();
exports.getUniversities = async () => {
    // Find by query
    const searchedUniversities = await prisma.universities.findMany();
    // Convert BigInt fields to string for safe serialization
    const serializedUniversities = JSONBigInt.stringify(searchedUniversities);
    return JSONBigInt.parse(serializedUniversities);
};
