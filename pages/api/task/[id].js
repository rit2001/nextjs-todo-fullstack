import { Task } from '../../../models/task';

const {checkAuth} =require( '../../../utils/features');
const  { asyncError, errorHandler } = require ('../../../middlewares/error');
const {connectDB} = require("../../../utils/features");

const handler = asyncError(async  (req,res) => {

         await connectDB();

         const user = await checkAuth(req);
         if(!user)
         {
            return errorHandler(res,400,"User not found");
         }

         const taskId=req.query.id;


         const task= await Task.findById(taskId);

         if(!task)
         {
            return errorHandler(res,400,"Task not found");
         }

    if(req.method === "PUT")
    {

         task.isCompleted = !task.isCompleted;

         await task.save();

         res.status(200).json({
            success:true,
            message:"Task updated successfully",
         });


    }   
    else if(req.method === "DELETE")
    {

        await task.deleteOne();

        res.status(200).json({
            success:true,
            message:"Task deleted successfully",
         });

    }
    else
    {
        errorHandler(res,400,"Only PUT and DELETE method is allowed");
    }    
  
   

    
});

export default handler;