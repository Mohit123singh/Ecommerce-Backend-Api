import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import ErrorResponse from '../utils/errorResponse.js'
import jwt  from 'jsonwebtoken'

// Protect Routes

const protect=asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        // set token from Bearer token in header.
        token=req.headers.authorization.split(' ')[1];
    }
    // set token from cookie
     else if(req.cookies.token)
         token=req.cookies.token;
     


    // Make sure token exists
    if(!token)
        return next(new ErrorResponse('Not authorized to access this route',401));
        

    try{
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        req.user=await User.findById(decoded.id).select('-password');
        next();


    }catch(err)
    {
        return next(new ErrorResponse('Not authorized to access this route',401));
    }

    

})

// Admin middleware
const admin=(req,res,next)=>{
    if(req.user && req.user.isAdmin)
        next();
    else
    {
        return next(new ErrorResponse('Not authorized to access this route',401));   
    }
}


export {
    protect,
    admin,
}