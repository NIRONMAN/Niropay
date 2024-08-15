const express = require("express");
const { User, Account } = require("../db");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWTSECRET } = require("../config");
const z = require("zod");
const { userauth } = require("../middlewares");

const ZodUserSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string()
})

userRouter.get("/me", userauth, async (req, res) => {
    
    try {
        const theUser = await User.findOne({
            _id: req.userId
        });
        if(theUser){
            res.status(200).json(theUser) ;
        }
        else{
            res.status(404).json({
                msg:"User didnt found"
            })
        }
        
    } catch (error) {
        res.json({
            msg:error
        })
    }
})

userRouter.post("/signup", async (req, res) => {
    const username = req.body.username;
    const newcontent = req.body;
    const result = ZodUserSchema.safeParse(newcontent);

    if (result.success) {
        const foundUser=await User.findOne({ username: username });

            if (foundUser) {
                res.status(411).json({
                    message: "Email already taken "
                });
            }
            else {
                const newUser = await User.create(newcontent);
                const userId = newUser._id;
                const token = jwt.sign({userId}, JWTSECRET);
                const bal=Math.floor(1 + Math.random() * 10000);
                await Account.create({
                    userId:newUser._id,
                    balance:bal
                })
                res.json({
                    message: "User created successfully",
                    YourBalance:bal,
                    token:token
                })
            }
        
    }
    else {
        res.status(411).json({
            message: " Incorrect inputs"
        });
    }



})

const signinSchema = z.object({
    username: z.string(),
    password: z.string().min(6),
    
})

userRouter.post("/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    
    const result = signinSchema.safeParse({username,password});

    if (result.success) {
        const foundUser=await User.findOne({ username,password });

            if (foundUser) {
                const userId=foundUser._id;
                const token = jwt.sign({userId}, JWTSECRET);
                res.status(200).json({
                    message: "User logged in  successfully",
                    token: token
                })
            }
            else {
                res.status(411).json({
                    message:"Credentials Did not found"
                })
                
            }
        
    }
    else {
        res.status(411).json({
            message: " Incorrect inputs"
        });
    }




})

//USEr put request
const updateBody = z.object({
	password: z.string().min(6).optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
})
userRouter.put("/",userauth,async (req,res)=>{
    const newcontent=req.body;
    const result = updateBody.safeParse(newcontent);

    if (result.success){
        await User.updateOne({
            id:req.userId
        },newcontent)
        res.json({message:"Data updated Succesfully"})
    }
    else{
        res.status(411).json({message:"Data does not updated Succesfully\nUse minimum 6 digit password"})
    }
   

})
userRouter.get("/bulk",async (req,res)=>{
    //const name=req.params.filter;
    const filter = req.query.filter ;
    
    console.log(filter)
    if (!filter) {
        return res.status(400).json({ error: "Missing 'filter' parameter" });
    }
    const people1=await User.find({
        $or:[{lastName:filter},{firstName:filter},
            { firstName: filter.charAt(0).toUpperCase() + filter.slice(1) }, 
            { lastName: filter.charAt(0).toUpperCase() + filter.slice(1) }
        ]
    })
    
    res.status(200).json({
        users:people1.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports = { userRouter };