const validator = require("validator")

const validateSignUpData = (req) => {

    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid!")
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong Password");
    }

}

const validateEditProfileData = (req) => {

    const allowedEditFields = ["firstName", "lastName", "age", "about", "photoUrl", "skills", "gender"];

    const { photoUrl, age, about, gender, skills } = req.body;


    // Validate photoUrl
    if (!validator.isURL(photoUrl)) {
        throw new Error("Invalid URL added: " + photoUrl);
    }

    // Validate skills array (must be an array of strings)
    if (!Array.isArray(skills) || !skills.every(skill => typeof skill === 'string')) {
        throw new Error("Skills must be an array of strings.");
    }

    // Validate age (must be a number)
    if (typeof age !== 'number' || isNaN(age)) {
        throw new Error("Age must be a valid number.");
    }

    // Validate about 
    if (typeof about !== 'string') {
        throw new Error("About must be a non-empty string");
    } else if (about.length > 300) {
        throw new Error("About section is too long (maximum 300 characters)");
    }

    // Validate gender (must be one of the allowed values)
    const allowedGenders = ['male', 'female', 'other'];
    if (!allowedGenders.includes(gender)) {
        throw new Error(`Invalid gender: ${gender}. Must be one of ${allowedGenders.join(', ')}`);
    }

    const isAllowedEdit = Object.keys(req.body).every(field => allowedEditFields.includes(field));
    return isAllowedEdit;
}

module.exports = {
    validateSignUpData,
    validateEditProfileData
}