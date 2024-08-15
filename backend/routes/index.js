const express =require("express");
const { userRouter } = require("./user");
const { accountRouter } = require("./account");

const rootrouter= express.Router();

rootrouter.use("/user",userRouter);
rootrouter.use("/account",accountRouter);
rootrouter.get("/",(req,res)=>{
    res.send("In the root router")
})

module.exports={rootrouter};