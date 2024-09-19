const mongoose = require("mongoose");
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
        trim: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 50,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email added : " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter valid passowrd : " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String
    },
    photoUrl: {
        type: String,
        default: "https://i.pinimg.com/736x/0d/64/98/0d64989794b1a4c9d89bff571d3d5842.jpg",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL added : " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is default description about user",
        minLength: 10,
        maxLength: 100,
        trim: true
    },
    skills: {
        type: [String],
        validate(value) {
            if (!Array.isArray(value) && !value.every(skill => typeof skill === 'string')) {
                throw new Error("Skills must be an array of strings.")
            }

        }
    }
}, {
    timestamps: true
}
)

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

userSchema.methods.getJwt = async function () {
    const user = this;
    const token = await jwt.sign({ _id: user._id }, "RAJ@TINDER", { expiresIn: "7d" });
    return token;
}


module.exports = mongoose.model("User", userSchema);