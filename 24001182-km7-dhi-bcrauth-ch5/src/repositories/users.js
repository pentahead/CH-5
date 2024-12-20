const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
  //encrypt password
  const saltrounds = 10;
  data.password = await bcrypt.hash(data.password, saltrounds);

  const newUser = await prisma.users.create({
    data,
  });

  const serializedUsers = JSONBigInt.stringify(newUser);
  return JSONBigInt.parse(serializedUsers);
};

// get user by email, compare passrodnya if true login
exports.getUserByEmail = async (data) => {
  const user = await prisma.users.findUnique({
    where: { email: data.email },
  });

  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};

exports.getUserById = async (id) => {
  const user = await prisma.users.findUnique({
    where: { id },
  });

  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};
