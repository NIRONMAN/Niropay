const express=require("express");
const { Account, User } = require("../db");
const { userauth } = require("../middlewares");
const { default: mongoose } = require("mongoose");
const accountRouter=express.Router();

accountRouter.get("/",(req,res)=>{
    res.send("hi from accounts")
})

accountRouter.get("/balance", userauth, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
        balance: account.balance
    })
});
accountRouter.post("/transfer", userauth, async (req, res) => {
    console.log("in account with req "+req.userId)
    const session = await mongoose.startSession();
    session.startTransaction();
    const receiverId = req.body.to;
    const transferAmount = req.body.amount;
    const receiverAccount = await Account.findOne({ userId: receiverId }).session(session);
    const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
    
    console.log(senderAccount)

    if (!receiverAccount) {
        return res.status(404).json({
            msg: "User does not found"
        });
    }

    

    try {
        if (senderAccount.balance < transferAmount) {
            return res.status(400).json({
                msg: "Insufficient amount"
            });
        }
        await Account.updateOne({ userId: receiverId}, { $inc: { balance: transferAmount } }).session(session);
        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -transferAmount } }).session(session);

        await session.commitTransaction();
        res.status(200).json({
            msg: "Transaction successful"
        });
    } catch (error) {
        await session.abortTransaction();
        console.error('Transaction aborted:', error);
        res.status(500).json({
            msg: "Transaction unsuccessful"
        });
    } finally {
        session.endSession();
    }
});
module.exports={
    accountRouter
}