const ClassesRepository = require("../repositories/classes");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getClasses = async (name, nickName) => {
  return ClassesRepository.getClasses(name, nickName);
};

exports.getClassesById = async (id) => {
  const Classes = await ClassesRepository.getClassesById(id);
  if (!Classes) {
    throw new NotFoundError("Classes is Not Found!");
  }
  return Classes;
};

exports.createClasses = async (data, file) => {
  // Upload file to image kit
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }
  return ClassesRepository.createClasses(data);
};

exports.updateClasses = async (id, data, file) => {
  // find Classes is exist or not (validate the data)
  const existingClasses = await ClassesRepository.getClassesById(
    id
  );
  if (!existingClasses) {
    throw new NotFoundError("Classes is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingClasses, // existing Classes
    ...data,
  };

  // Upload file to image kit
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  // if exist, we will update the Classes data
  const updatedClasses = await ClassesRepository.updateClasses(
    id,
    data
  );
  if (!updatedClasses) {
    throw new InternalServerError(["Failed to update Classes!"]);
  }
  return updatedClasses;
};

exports.deleteClassesById = async (id) => {
  // find Classes is exist or not (validate the data)
  const existingClasses = await ClassesRepository.getClassesById(
    id
  );
  if (!existingClasses) {
    throw new NotFoundError("Classes is Not Found!");
  }

  // if exist, we will delete the Classes data
  const deletedClasses =
    await ClassesRepository.deleteClassesById(id);
  if (!deletedClasses) {
    throw new InternalServerError(["Failed to delete Classes!"]);
  }

  return deletedClasses;
};
