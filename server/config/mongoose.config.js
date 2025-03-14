const mongoose = require("mongoose");
const dbName = "pizza";
require("dotenv").config();
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log(`Connected to ${dbName} database!`))
    .catch((err) => console.log(err)); 