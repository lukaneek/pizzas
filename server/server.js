const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
require("./config/mongoose.config.js");
const User = require("./models/user.model.js");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer');

var transporter = null;
const emailText = "<div style='font- family: system-ui, sans - serif, Arial;\
    font - size: 14px;\
    color: #333;\
    padding: 20px 14px;\
    background - color: #f5f5f5;\
    '>\
    <div style='max-width: 600px; margin: auto; background-color: #fff'>\
    <div style='text-align: center; background-color: #333; padding: 14px'>\
      <a style='text-decoration: none; color: #fff; outline: none' href='https://lukavujasin.xyz/pizzas/' target='_blank'>\
      Luka's Pizzeria\
      </a>\
    </div>\
    <div style='padding: 14px'>\
      <h1 style='font-size: 22px; margin-bottom: 26px'>Registration Verification</h1>\
      <p>\
        Please press the link to verify your account.\
      </p>\
      <p>\
        <a href='{{link}}'>{{link}}</a>\
      </p>\
      <p>This link will expire in one hour.</p>\
      <p>\
        If you didn't request this registration, please ignore this email or let us know\
        immediately.\
      </p>\
      <p>Best regards,<br />Luka's Pizzeria Team</p>\
    </div>\
  </div>\
  <div style='max-width: 600px; margin: auto'>\
    <p style='color: #999'>\
      The email was sent to {{email}}<br />\
      You received this email because you are registering with Luka's Pizzeria.\
    </p>\
    </div>\
    </div >";

var mailOptions = {
    from: process.env.EMAIL_LOGIN,
    to: '',
    subject: 'Registration Verification for Lukas Pizzeria',
    html: ""
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ['http://localhost:8080', 'https://lukavujasin.xyz']
}));

app.listen(3000, function () {
    console.log('Listening on port 3000');
    transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_LOGIN,
            pass: process.env.EMAIL_PASSWORD
        }
    });
});

app.get("/", function (req, res) {
    return res.send("Response from pizza server");
});

app.get("/user", async (req, res) => {
    const { userId } = req.query;

    try {
        const user = await User.findOne({ _id: userId });
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
        if (!user.isVerified) {
            return res.status(401).json("This account has not been verified yet.  Please check your email for a verification link.");
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(404).json("No account associated with this email address and password.");
        }
        else {
            res.status(200).json({userId:user._id});
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
        let user = await User.findOne({ email: email });

        if (user) {
            res.status(409).json("Account with this email address already exists.");
        }
        else {
            await User.create(data);
            user = await User.findOne({ email: email });
            mailOptions.to = email;
            const temp = emailText.replaceAll("{{email}}", email);
            mailOptions.html = temp.replaceAll("{{link}}", process.env.EMAIL_VERIFICATION_LINK + user._id);
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    return res.status(500).json("An unexpected error occured.");
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
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

app.post("/verify", async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json("Couldn't find user associated with this email address.  Please register again.");
        }

        const update = await User.findByIdAndUpdate({ _id: user._id }, { isVerified: true });

        res.status(200).json("Successfully verified.");
    }
    catch (e) {
        res.status(500).json("An unexpected error has occured.");
        console.log(e);
    }
})

app.post("/order", async (req, res) => {
    const { userId, toppings, crust, size, method, quantity } = req.body;

    try {
        const user = await User.findOne({ _id: userId });

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
    const { userId, password, city, state, address, zipCode } = req.body;

    try {
        const user = await User.findOne({ _id: userId });

        const update = await User.findByIdAndUpdate(
            { _id: user._id },
            {
                email: user.email,
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
    const { userId } = req.body;
    try {
        const user = await User.findOne({ _id : userId });
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