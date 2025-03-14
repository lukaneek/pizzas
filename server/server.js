const express = require("express");
const cors = require("cors");
const app = express();
require("./config/mongoose.config.js");
const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3000"
}));

app.listen(3000, function () {
    console.log('Listening on port 3000');
});

app.get("/", cors(), function (req, res) {
    return res.send("Response from pizza server");
});

app.get("/user", async(req, res) => {
    const { email } = req.query;

    try {
        const user = await User.findOne({ email:email });
        res.json(user);
    }
    catch (e) {
        res.json("nonexist");
    }
})

app.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const check = await User.findOne({ email: email })
        console.log("user finding: " + check)
        if (!check) {
            res.json("nonexist");
        }
        const isMatch = await check.comparePassword(password);
        if (!isMatch) {
            res.json("nonexist");
        }
        else {
            res.json("exists");
        }
    }
    catch (e) {
        res.json("nonexist")
    }
})



app.post("/register", async (req, res) => {
    const { email, password, city, state, address } = req.body;
    console.log("data");
    const data = {
        email: email,
        password: password,
        city: city,
        state: state,
        address: address
    }
    try {
        const check = await User.findOne({ email: email })
        console.log("user findin 1: " + check)
        if (check) {
            res.json("exists")
        }
        else {
            await User.create(data)
            res.json("nonexist")
        }
    }
    catch (e) {
        res.json("nonexist")
    }
})

app.post("/order", async (req, res) => {
    console.log(req.body)
    const { email, toppings, crust, size, method, quantity } = req.body;
    try {
        const user = await User.findOne({ email: email })
        console.log({ toppings, crust, size, method, quantity });
        user.pizzas.push({ toppings, crust, size, method, quantity });
        console.log("adding pizzas to user: " + user);
        const update = await User.findByIdAndUpdate({ _id: user._id }, { pizzas: [...user.pizzas] });
        res.json("saved pizza");
    }
    catch (err) {
        console.log(err);
    }

})

app.put("/account", async (req, res) => {
    const { email, password, city, state, address } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({ email: email });
        console.log("user finding: " + user);
        if (!user) {
            res.json("nonexist");
        }
        else {

            const update = await User.findByIdAndUpdate(
                { _id: user._id },
                {
                    email: email,
                    password: password ? await hashPassword(password) : user.password,
                    city: city,
                    state: state,
                    address: address
                });
            res.json("exists");
        }
    }
    catch (e) {
        res.json("nonexist")
    }
})

app.post("/pizzas", async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        const user = await User.findOne({ email: email });
        console.log("getyting pizzas: " + user);
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }
})

app.post("/delete", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email: email });
        const deleteUser = await User.deleteOne(user);
        res.json("user deleted");
    }
    catch (err) {
        console.log(err);
    }
})

async function hashPassword(password) {
    try {
        console.log("password before hashing: " + password);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (err) {
        console.log("error hashing");
    }
}