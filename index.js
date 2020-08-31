const express = require("express");
const bodyparse = require("body-parser");
const mongoose = require("mongoose");
const userAuth = require("./routes/user");
const cors = require("cors");
const path = require("path");
var str = "mongodb+srv://admin:test123@cluster0.uxrmi.gcp.mongodb.net/User1DB?retryWrites=true&w=majority"
//"mongodb://localhost:27017/User1DB"
mongoose
    .connect(str, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected!");
    })
    .catch((err) => console.log(err));


const app = express();
app.use(cors());
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json())
app.use("/auth", userAuth);


app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server up and running on port ${port}!`);

});