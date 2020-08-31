const validator = require("validator");
const isEmpty = require("is-empty");

/*
The login routes takes in email and password both these fields are validated 
that is I check if email/password is empty or is email or not.If validation is not
successfull then an error is sent to the client
*/


function validateLogin(data) {
    const { email, password } = data;
    var err = {};


    if (isEmpty(email)) err.email = "Email cannot be empty"; else if (!validator.isEmail(email)) err.email = "Enter valid email address";
    if (isEmpty(password)) err.password = "Please enter your password";
    return {
        err,
        isValid: isEmpty(err)
    }
}

module.exports = validateLogin;