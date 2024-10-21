const userRepository = require("../repositories/users");
const jwt = require("jsonwebtoken");
const { imageUpload } = require("../utils/image-kit");

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

exports.login = async (data) =>{
  const user = await userRepository.getUser(data);
  const token = jwt.sign(
    { id: user.id, email: user.email }, 
    process.env.JWT_SECRET,
    { expiresIn: "1h" } 
  );
  return user, token;
}
