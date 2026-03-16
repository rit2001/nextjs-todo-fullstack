import {connectDB} from '../../utils/features';
import {Task} from "../../models/task";
import { asyncError, errorHandler } from '../../middlewares/error';
import {checkAuth} from '../../utils/features';

const handler = asyncError(async  (req,res) => {

    if(req.method !== "POST")
        return errorHandler(res,400,"Only POST method is allowed");

    await connectDB();

    const {title,description} = req.body;

    if(!title || !description)
    {
        return errorHandler(res,400,"Please enter all fields");
    }

    const user = await checkAuth(req);

    if(!user)
    {
        return errorHandler(res,400,"User not found");
    }


    await Task.create({
        title,
        description,
        user:user._id,

    });

    res.json({
        success:true,
        message:"Task created successfully",
    });
});

export default handler;