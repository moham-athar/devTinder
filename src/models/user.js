const validator = require("validator");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
    },
    emailId : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Enter correct email" + value);
            }
        }
    },
    password : {
        type : String,
        required : true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter Strong password");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
    },
    gender : {
        type : String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Unrecognized gender");
            }
        }
    },
    skills : {
        type : [String],
    },
    about : {
        type : String,
        default : "Hey there!",
    }
},
{
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);