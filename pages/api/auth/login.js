import { cookieSetter, generateToken } from "../../../utils/features";

const { asyncError, errorHandler } = require("../../../middlewares/error");
const {User} = require("../../../models/user");
const {connectDB} = require("../../../utils/features");
const bcrypt = require ("bcrypt");


const handler = asyncError(async (req, res) => {
  
  
  if (req.method !== "POST")
    return errorHandler(res, 400, "Only POST Method is allowed");


  const { email, password } = await  req.body;

  if ( !email || !password)
    return errorHandler(res, 400, "Please enter all fields");

  await connectDB();

  const  user = await User.findOne({ email }).select("+password");

  if (!user) return errorHandler(res, 400, "Invalid Email or Password");

  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch) return errorHandler(res, 400, "Invalid Email or Password");


  const token = generateToken(user._id);

  cookieSetter(res, token, true);

  res.status(201).json({
    success: true,
    message: `Welcome back, ${user.name}`,
    user
  });
});

export default handler;