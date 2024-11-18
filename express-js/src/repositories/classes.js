const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");

const prisma = new PrismaClient();

exports.getClasses = async () => {
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
  const searchedClasses = await prisma.classes.findMany(query);
  // Convert BigInt fields to string for safe serialization
  const serializedClasses = JSONBigInt.stringify(searchedClasses);
  return JSONBigInt.parse(serializedClasses);
};

exports.ById = async (id) => {
  const Classes = await prisma.Classes.findUnique({
    where: { id: id },
  });

  // Convert BigInt fields to string for safe serialization
  const serializedClasses = JSONBigInt.stringify(Classes);
  return JSONBigInt.parse(serializedClasses);
};

exports.createClasses = async (data) => {
  const newClasses = await prisma.classes.create({
    data,
  });

  const serializedClasses = JSONBigInt.stringify(newClasses);
  return JSONBigInt.parse(serializedClasses);
};

exports.updateClasses = async (id, data) => {
  const updatedClasses = await prisma.classes.update({
    where: {
      id: id,
    },
    data,
  });
  const serializedClasses = JSONBigInt.stringify(updatedClasses);
  return JSONBigInt.parse(serializedClasses);
};

exports.deleteClassesById = async (id) => {
  const deletedClasses = await prisma.classes.delete({
    where: {
      id: id,
    },
  });

  const serializedClasses = JSONBigInt.stringify(deletedClasses);
  return JSONBigInt.parse(serializedClasses);
};
