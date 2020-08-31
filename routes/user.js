const express = require("express");
const route = express.Router();
const validateRegister = require("../validation/register");
const validLogin = require("../validation/login");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const isEmpty = require("is-empty");
const genToken = require("../utils/genToken");
const validateLogin = require("../validation/login");
const mail = require("../utils/sendMail");

/* This route taken in all the feilds required to register a new user 
and then validate it if validation is successfull then  
generate new token and send it to Client.*/

route.post("/register", (req, res) => {
    const { name, email, password, Cpassword } = req.body;
    const { err, isValid } = validateRegister(req.body);
    if (!isValid) {
        res.json(err);
        return;
    }
    User.findOne({ Email: email }).then(result => {
        if (!isEmpty(result)) {
            res.json({ email: "Email already exist!" });
            return;
        }
        var newUser = new User({
            Name: name,
            Email: email
        })
        bcrypt.genSalt(10, (err, salt) => {
            if (err) console.log(err);
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) console.log(err);
                newUser.Password = hash;
                newUser.save().then(result1 => {
                    User.findOne({ Email: email }).then(result => {
                        //console.log(result)
                        genToken(result._id, (token) => {
                            res.json(token);
                        })
                    })
                })


            })
        })
    })


})
/*
This route "/auth/login" takes email and password as input and then validates it if any error then 
then it will send those error to client. If no error then we look for email in database and then 
use "bcrypt" to compare both passwords if match then the user is Authenticated.
*/

route.post("/login", (req, res) => {
    const { email, password } = req.body;
    const { err, isValid } = validateLogin(req.body);

    if (!isValid) {
        res.json(err);
        return;
    }
    User.findOne({ Email: email }).then(result => {
        if (isEmpty(result)) {
            res.json({ email: "Email does not exists" });
            return;
        }
        bcrypt.compare(password, result.Password).then(match => {
            // console.log(match)
            if (!match) {
                res.json({ password: "Invalid Password" });
                return;
            }

            genToken(result._id, (token) => {
                res.status(200).json(token);
            })
        })
    })
})

/*
This route "/auth/mail" takes email as input and send that email address any email we want
for now I am sending only test message.
*/

route.post("/sendMail", (req, res) => {
    const { email } = req.body;
    mail(email, (done) => {
        if (done) res.json({ success: "Mail sent !" }); else res.json({ err: "Network error Try again" });
    })
})
module.exports = route;