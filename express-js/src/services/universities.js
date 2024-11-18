const UniversitiesRepository = require("../repositories/universities");
const { imageUpload } = require("../utils/image-kit");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getUniversities = async (name, nickName) => {
  return UniversitiesRepository.getUniversities(name, nickName);
};

exports.getUniversitiesById = async (id) => {
  const Universities = await UniversitiesRepository.getUniversitiesById(id);
  if (!Universities) {
    throw new NotFoundError("Universities is Not Found!");
  }
  return Universities;
};

exports.createUniversities = async (data, file) => {
  // Upload file to image kit
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }
  return UniversitiesRepository.createUniversities(data);
};

exports.updateUniversities = async (id, data, file) => {
  // find Universities is exist or not (validate the data)
  const existingUniversities = await UniversitiesRepository.getUniversitiesById(
    id
  );
  if (!existingUniversities) {
    throw new NotFoundError("Universities is Not Found!");
  }

  // replicated existing data with new data
  data = {
    ...existingUniversities, // existing Universities
    ...data,
  };

  // Upload file to image kit
  if (file?.profile_picture) {
    data.profile_picture = await imageUpload(file.profile_picture);
  }

  // if exist, we will update the Universities data
  const updatedUniversities = await UniversitiesRepository.updateUniversities(
    id,
    data
  );
  if (!updatedUniversities) {
    throw new InternalServerError(["Failed to update Universities!"]);
  }
  return updatedUniversities;
};

exports.deleteUniversitiesById = async (id) => {
  // find Universities is exist or not (validate the data)
  const existingUniversities = await UniversitiesRepository.getUniversitiesById(
    id
  );
  if (!existingUniversities) {
    throw new NotFoundError("Universities is Not Found!");
  }

  // if exist, we will delete the Universities data
  const deletedUniversities =
    await UniversitiesRepository.deleteUniversitiesById(id);
  if (!deletedUniversities) {
    throw new InternalServerError(["Failed to delete Universities!"]);
  }

  return deletedUniversities;
};
