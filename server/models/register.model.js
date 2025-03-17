const mongoose = require("mongoose");
const RegisterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "must enter vaild email"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "must enter vaild email"]
    },
    city: {
        type: String,
        required: [true, "must enter a city"]
    },
    state: {
        type: String,
        required: [true, "must enter a state"]
    },
    address: {
        type: String,
        required: [true, "must enter an address"]
    },
    zipCode: {
        type: String,
        required: [true, "must enter a zipcode"]
    }
}, { timestamps: true })

const Register = mongoose.model("Register", RegisterSchema);

module.exports = Register;