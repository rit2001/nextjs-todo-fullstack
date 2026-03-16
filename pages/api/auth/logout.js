import { cookieSetter, generateToken } from "../../../utils/features";

const { asyncError, errorHandler } = require("../../../middlewares/error");
const {User} = require("../../../models/user");
const {connectDB} = require("../../../utils/features");
const bcrypt = require ("bcrypt");


const handler = asyncError(async (req, res) => {
  

  cookieSetter(res, null, false);

  res.status(200).json({
    success: true,
    message: `Logged out successfully`,
  });
});

export default handler;