const validator = require("validator");

const reqBodyValidation = ({ firstName, lastName, emailId, password }) => {
  if (!firstName || firstName.length < 3 || firstName.length > 25) {
    throw new Error("Invalid firstName");
  } else if (lastName && (lastName.length < 3 || lastName.length > 25)) {
    throw new Error("Invalid lastName");
  } else if (!emailId || !validator.isEmail(emailId)) {
    throw new Error("Invalid email format");
  } else if (!password || !validator.isStrongPassword(password)) {
    throw new Error("password is not Strong enough");
  }
};

const validateEditProfileData = (data) => {
  const fieldUpdateAllowed = [
    "firstName",
    "lastName",
    "gender",
    "skills",
    "about",
    "photoURL",
  ];

  const isEditAllowed = Object.keys(data).every((field) =>
    fieldUpdateAllowed.includes(field)
  );

  console.log(`isEditAllowed : ${isEditAllowed}`);

  return isEditAllowed;
};

module.exports = {
  reqBodyValidation,
  validateEditProfileData,
};
