const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secret = "atreya";
/*
This function takes in id looks for the detail i the database and gennrate a 
JWT token and send it to the client.The token will be sent with evry request 
to the server and the server will decode it and use. This is how I will maintain sessions.
*/
function tokenGen(id, clbk) {
    User.findOne({ "_id": id }).then(result => {
        const payload = {
            id,
            name: result.Name,
            email: result.Email
        }
        jwt.sign(payload, secret, {
            expiresIn: 31556926
        }, (err, token) => {
            if (err) console.log(err); else {
                var newToken = {
                    success: true,
                    token: "Bearer " + token
                };
                clbk(newToken);
            }

        })
    }).catch(err => {
        console.log(err);
    })
}

module.exports = tokenGen;