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
// getting single user from DB using email with Model.find query.
//every API call in mongoose is a promise so use of async function is always neccesary
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const users = await User.find({emailId : userEmail});
        if (users.length === 0 ) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
})

//getting all user data from DB
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
});

// getting data using ids
app.get("/byId", async (req, res) => {
    try {
        const user = await User.findById({_id : req.body._id});
        res.send(user);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

app.delete("/user", async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
    }catch (err) {
        res.status(400).send("Something went wrong");
    }
}) 
//updating data in DB
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params?.userId;
    const data = req.body;

    try {
       const ALLOWED_UPDATES = ["age", "skills", "gender"];
       const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
       if (!isUpdateAllowed) {
        throw new Error("Update not Allowed");
       }

       const user = await User.findByIdAndUpdate({_id : userId}, data);
       res.send("User updated successfully");
    }
    catch(err) {
        res.status(400).send("Something went wrong");
    }
});

connectDB().then(() => {
    // establishing connection to db first instead of server so that there is no unfullfilled request before the creation of server.
    console.log("Connection to DB established");
    app.listen(3000, () => {
    console.log("Server is successfully established");
});
}).catch((err) => {
    console.error("Error");
})
