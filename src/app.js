const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const app = express();
app.use(express.json());


app.post("/signup", async (req, res) => {
    // creating new instance of User
    const user = new User(req.body);
    try {
    await user.save();
    res.send("User succesfully added");
    }catch(err) {
        res.status(400).send("Something went wrong" + err.message);
    }
    
})

connectDB().then(() => {
    // establishing connection to db first instead of server so that there is no unfullfilled request before the creation of server.
    console.log("Connection to DB established");
    app.listen(3000, () => {
    console.log("Server is successfully established");
});
}).catch((err) => {
    console.error("Error");
})
