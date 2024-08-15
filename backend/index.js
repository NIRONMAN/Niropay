const express = require("express");
const app=express();
const { rootrouter } = require("./routes");
const cors=require("cors")
app.use(cors());
app.use(express.json());

app.use("/api/v1",rootrouter);

app.get("/",(req,res)=>{
    res.send("Hey go to ap1/v1 endpoint")
})

app.listen(3000,()=>{
    console.log("Listening on 3000")
});

