const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getUniversities = async () => {
  // Define query here
  let query = {};

  // It will generate the query
  let orQuery = [];

  if (orQuery.length > 0) {
    query.where = {
      ...query.where,
      OR: orQuery,
    };
  }
  const searchedUniversities = await prisma.universities.findMany(query);
  // Convert BigInt fields to string for safe serialization
  const serializedUniversities = JSONBigInt.stringify(searchedUniversities);
  return JSONBigInt.parse(serializedUniversities);
};

exports.ById = async (id) => {
  const Universities = await prisma.universities.findUnique({
    where: { id: id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedUniversities = JSONBigInt.stringify(Universities);
  return JSONBigInt.parse(serializedUniversities);
};

exports.createUniversities = async (data) => {
  const newUniversities = await prisma.universities.create({
    data,
  });

  const serializedUniversities = JSONBigInt.stringify(newUniversities);
  return JSONBigInt.parse(serializedUniversities);
};

exports.updateUniversities = async (id, data) => {
  const updatedUniversities = await prisma.universities.update({
    where: {
      id: id,
    },
    data,
  });
  const serializedUniversities = JSONBigInt.stringify(updatedUniversities);
  return JSONBigInt.parse(serializedUniversities);
};

exports.deleteUniversitiesById = async (id) => {
  const deletedUniversities = await prisma.universities.delete({
    where: {
      id: id,
    },
  });

  const serializedUniversities = JSONBigInt.stringify(deletedUniversities);
  return JSONBigInt.parse(serializedUniversities);
};
