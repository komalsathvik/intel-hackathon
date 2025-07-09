const mongoose=require("mongoose");
const express=require("express");
require("dotenv").config();
const cors=require("cors");
const cookieParser = require("cookie-parser");
const port=process.env.PORT || 3000;
const url=process.env.MONGO_URL;
const app=express();
const authRoute=require("../Backend/Routes/AuthRoute");
app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));


app.use("/api", authRoute);

function db(){
try{
    mongoose.connect(url,{
  });
    console.log("db connected");
}
catch(e){
    console.log(`some error in connecting to db ${e}`);
}
}
app.listen(port,()=>{
    console.log(`sever is running on port ${port}`);
    db();
})
