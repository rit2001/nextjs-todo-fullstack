const {checkAuth} =require( '../../../utils/features');
const  { asyncError, errorHandler } = require ('../../../middlewares/error');

const handler = asyncError(async  (req,res) => {

    if(req.method !== "GET")
        return errorHandler(res,400,"Only GET method is allowed");

  
    const user = await checkAuth(req);

    res.status(200).json({
        success:true,
        user,
    });
});

export default handler;