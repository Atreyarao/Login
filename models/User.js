const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/* 
This is the DB model for User authentication.
*/

const userSchema = new Schema({
    Name: {
        type: String
    },
    Email: {
        type: String
    },
    Password: {
        type: String
    }
})

module.exports = User = mongoose.model("userDB1", userSchema);
