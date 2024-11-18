const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");
const axios = require("axios");
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
exports.getUserByEmail = async (email) => {
  const user = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  const serializedStudents = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedStudents);
};

exports.getUserById = async (id) => {
  const user = await prisma.users.findFirst({
    where: {
      id,
    },
  });

  const serializedUser = JSONBigInt.stringify(user);
  return JSONBigInt.parse(serializedUser);
};

exports.googlelogin = async (accessToken) => {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
  );
  return response?.data;
};
