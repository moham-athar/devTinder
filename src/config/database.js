const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://atharnodejs:etiCZlj4he44HXXr@cluster0.hvc6g.mongodb.net/devTinder");
};

module.exports = connectDB;