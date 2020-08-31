const validator = require("validator");
const isEmpty = require("is-empty");

/*
The register route takes in "email,password,confirmPassword,name" I validate all these feilds 
that is I check for conditions like:
1) Are the fields empty
2) Is it a valid email address
3) Are passwords matching
4)Are the length of password between 6-30
If validation fails it sends all the error to Client.
*/

function validateRegister(data) {
    const { name, email, password, Cpassword } = data;
    var err = {};
    //Check Feilds if they are empty.
    if (isEmpty(name)) err.name = "Please Enter Your Name";
    if (isEmpty(email)) err.email = "Please Enter the email address"; else if (!validator.isEmail(email)) err.email = "Invalid email address";
    if (isEmpty(password) || isEmpty(Cpassword)) err.password = "Both the password fields are empty"; else if (password !== Cpassword) err.password = "Passwords do not match";
    else if (!validator.isLength(password, { min: 6, max: 30 })) err.password = "Password must be between 6 to 30 in length";


    return {
        err,
        isValid: isEmpty(err)
    };

}

module.exports = validateRegister;