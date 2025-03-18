const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Must enter vaild email."],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Must enter vaild email."]
    },
    city: {
        type: String,
        required: [true, "Must enter a city."]
    },
    state: {
        type: String,
        required: [true, "Must enter a state."],
    },
    address: {
        type: String,
        required: [true, "Must enter an address."]
    },
    zipCode: {
        type: String,
        required: [true, "Must enter a zip code."]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    pizzas: [{
        toppings: [{
            type: String,
            required: [true, "Pizza must have toppings."],
            maxlength: [10, "Can't have more than 10 toppings."]
        }],
        size: {
            type: String,
            required: [true, "Must have a size."]
        },
        crust: {
            type: String,
            required: [true, "Must have a crust."]
        },
        quantity: {
            type: Number,
            required: [true, "Must have a quantity."]
        },
        method: {
            type: String,
            required: [true, "Must have delivery method."]
        },
        orderDate: {
            type: Date,
            required: true,
            default: Date.now
        }
    }],

}, { timestamps: true })


UserSchema.pre('save', async function (next) {
    try {
        console.log("before saving a user");
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();
    } catch (err) {
        next(err);
    }
})

UserSchema.post("save", async function (next) {
    try {
        console.log("after saving a user");
    }
    catch (err) {
        next(err);
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    }
    catch (e) {
        console.log("error comparing passwords");
    }
};

const User = mongoose.model("User", UserSchema);

module.exports = User;