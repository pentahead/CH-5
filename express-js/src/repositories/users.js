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

exports.getUser = async (data) => {
  const finduserbyemail = await prisma.users.findUnique({
    where: { email: data.email },
  });
  const validPassword = await bcrypt.compare(
    data.password,
    finduserbyemail.password
  );
  const serializedUsers = JSONBigInt.stringify(finduserbyemail);
  return JSONBigInt.parse(serializedUsers);
};
// get user by ElementInternals, compare passrodnya if true login
