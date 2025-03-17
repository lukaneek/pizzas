const express = require("express");
const cors = require("cors");
const app = express();
require("./config/mongoose.config.js");
const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:8080', 'https://lukavujasin.xyz']
}));

app.listen(3000, function () {
    console.log('Listening on port 3000');
});

app.get("/", function (req, res) {
    return res.send("Response from pizza server");
});

app.get("/user", async (req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email: email });
        res.json(user);
    }
    catch (e) {
        res.json("nonexist");
    }
})

app.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json("No account associated with this email address and password.");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(404).json("No account associated with this email address and password.");
        }
        else {
            res.status(204).json("");
        }
    }
    catch (e) {
        res.status(500).json("An unexpected error occured.");
        console.log(e);
    }
})



app.post("/register", async (req, res) => {
    const { email, password, city, state, address, zipCode } = req.body;

    const data = {
        email: email,
        password: password,
        city: city,
        state: state,
        address: address,
        zipCode: zipCode
    }
    try {
        const user = await User.findOne({ email: email });

        if (user) {
            res.status(409).json("Account with this email address already exists.");
        }
        else {
            await User.create(data);
            res.status(201).json("Successfully created user!");
        }
    }
    catch (e) {
        if (e.name == "ValidationError") {
            const errors = [];
            for (const path in e.errors) {
                const validationError = e.errors[path];
                errors.push({ name: path, message: validationError.message });
            }
            res.status(422).json(errors);
        }
        else {
            res.status(500).json("An unexpected error occured.");
            console.log(e);
        }
    }
})

app.post("/order", async (req, res) => {
    const { email, toppings, crust, size, method, quantity } = req.body;

    try {
        const user = await User.findOne({ email: email });

        user.pizzas.push({ toppings, crust, size, method, quantity });

        const update = await User.findByIdAndUpdate({ _id: user._id }, { pizzas: [...user.pizzas] });
        res.status(201).json("Successfully ordered pizza!");
    }
    catch (e) {
        res.status(500).json("An unexpected error occured.");
        console.log(e);
    }

})

app.put("/account", async (req, res) => {
    const { email, password, city, state, address, zipCode } = req.body;

    try {
        const user = await User.findOne({ email: email });

        const update = await User.findByIdAndUpdate(
            { _id: user._id },
            {
                email: email,
                password: password ? await hashPassword(password) : user.password,
                city: city,
                state: state,
                address: address,
                zipCode: zipCode
            },
            { runValidators: true });
        res.status(204).json("");
    }
    catch (e) {
        if (e.name == "ValidationError") {
            const errors = [];
            for (const path in e.errors) {
                const validationError = e.errors[path];
                errors.push({ name: path, message: validationError.message });
            }
            res.status(422).json(errors);
        }
        else {
            res.status(500).json("An unexpected error occured.");
            console.log(e);
        }
    }
})
app.post("/delete", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const deleteUser = await User.deleteOne(user);
        res.status(204).json("Successfully deleted your account!");
    }
    catch (e) {
        res.status(500).json("An unexpected error occured.");
        console.log(e);
    }
})

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.log("error hashing");
    }
}