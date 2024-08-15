const mongoose =require("mongoose");
const { Schema } = require("zod");
mongoose.connect('mongodb+srv://niranjan:zFU1sfFYMgEMuJxj@niranjancluster.z3y3n8m.mongodb.net/paytmApp');

const UserSchema= new mongoose.Schema({
    username:String,
    password:String,
    firstName:String,
    lastName:String,
   
});
const accountSchema= new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    } ,
	balance: {
        type:Number,
        required:true
    }

})
const User=mongoose.model("User",UserSchema)
const Account=mongoose.model("Account",accountSchema)
module.exports = {
	User,
    Account
};
