const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve HTML files
app.use(express.static(__dirname));


// MongoDB Connection

mongoose.connect("mongodb://127.0.0.1:27017/nitesh")

.then(() => {
    console.log("MongoDB Connected");
})

.catch((err) => {
    console.log(err);
});


// User Schema

const userSchema = new mongoose.Schema({

    name: String,
    email: String,
    password: String

});

const User = mongoose.model("User", userSchema);


// Open Login Page First

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "login.html")
    );

});


// Register Route

app.post("/register", async (req, res) => {

    try {

        const newUser = new User({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        });

        await newUser.save();

        res.redirect("/login.html");

    }

    catch (error) {

        res.send("Registration Failed");

    }

});


// Login Route

app.post("/login", async (req, res) => {

    try {

        const user = await User.findOne({

            email: req.body.email,
            password: req.body.password

        });

        if (user) {

            res.send("Login Successful");

        }

        else {

            res.send("Invalid Email or Password");

        }

    }

    catch (error) {

        res.send("Login Failed");

    }

});


// Start Server

app.listen(3000, () => {

    console.log(
        "Server running at http://localhost:3000"
    );

});