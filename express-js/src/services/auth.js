const userRepository = require("../repositories/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { imageUpload } = require("../utils/image-kit");
const { Unauthorized } = require("../utils/request");

exports.register = async (data, file) => {
  if (file.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  //create user
  const user = await userRepository.createUser(data);

  //generate token with jwt
  const payload = {
    user_id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "3h", //expires in 3 hours
  });

  //dont forget to remocve the password object, if not removed it will be diplayed in response
  delete user.password;

  //return user info and the token
  return { user, token };
};

exports.login = async (data) => {
  const user = await userRepository.getUserByEmail(data);
  if (!user) {
    throw new Unauthorized("Email tidak ditemukan!");
  }

  const validPassword = await bcrypt.compare(data.password, user.password);
  if (!validPassword) {
    throw new Unauthorized("Password salah");
  }

  //generate token with jwt
  const token = createToken(user);

  delete user.password;

  return {
    user,
    token,
  };
};

exports.googleLogin = async (accessToken) => {
  const { email, name, picture } = await userRepository.googlelogin(
    accessToken
  );

  let user = await userRepository.getUserByEmail(email);
  if (!user) {
    //if user dgn email itu blm ada. maka buat email
    user = await userRepository.createUser({
      email,
      name,
      profile_picture: picture,
      password: "",
    });
  }
  //create token
  const token = createToken(user);

  //dont forget to remove the password object, if not it will be displayed in reposnse
  delete user.password;
  return { user, token };
};

const createToken = (user) => {
  const token = jwt.sign({ user_id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "72h",
  });
  return token;
};
