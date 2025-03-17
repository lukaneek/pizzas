const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "must enter vaild email"]
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
        required: [true, "must enter a zip code"]
    },
    pizzas: [{
        toppings: [{
            type: String,
            required: [true, "pizza must have toppings"],
            maxlength: [10, "can't have more than 10 toppings"]
        }],
        size: {
            type: String,
            required: [true, "A movie's genre is required!!!"]
        },
        crust: {
            type: String,
            required: [true, "must have a size"]
        },
        quantity: {
            type: Number,
            required: [true, "must have a quantity"]
        },
        method: {
            type: String,
            required: [true, "must have delivery method"]
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