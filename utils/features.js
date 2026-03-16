import mongoose from "mongoose";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { User } from "../models/user";
import { errorHandler } from "../middlewares/error";


export const connectDB = async () => {

    const {connection} = await  mongoose.connect(process.env.MONGO_URI,{
        dbName:"NextTodoApp",
    });
   
};

export const cookieSetter = (res,token,set) => {

  
     res.setHeader(
        "Set-Cookie",
        serialize("token",set ? token:"",{
        path:"/",    
        httpOnly:true,
        maxAge:set ? 15*24*60*60*1000 : 0,
     }));
};


export const generateToken = (_id) => {

    return jwt.sign({_id},process.env.JWT_SECRET);

};

export const checkAuth = async (req) => {

    const cookie = req.headers.cookie;

    if(!cookie) return null;

    const token = cookie
      .split(";")
      .find((c) => c.trim().startsWith("token="))
      ?.split("=")[1];

    if(!token) return null;

    const decodeddata = jwt.verify(token,process.env.JWT_SECRET);

    return await User.findById(decodeddata._id);
};

    