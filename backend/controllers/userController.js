import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js'
import ErrorResponse from '../utils/errorResponse.js'

// @desc Auth user & get token
// @route POST/api/users/login
// @access Public

const authUser=asyncHandler(async(req,res,next)=>{

   const {email,password}=req.body;

   // Validate email & password

   if(!email || !password)
   {
    return next(new ErrorResponse('Please provide an email and password',400));
   }

   // Check for user
   const user=await User.findOne({email});

   if(!user)
   {
    return next(new ErrorResponse('Invalid credentials',401));    
   }

   // Check if password matches
   const isMatch=await user.matchPassword(password);

   if(!isMatch)
   {
    return next(new ErrorResponse('Invalid credentials',401));    
   }
    
   sendTokenResponse(user,200,res);

})


// @desc Register User
// @route POST/api/users
// @access Public
 const registerUser=asyncHandler(async(req,res,next)=>{

     const {name,email,password}=req.body;

     const userExist=await User.findOne({email});


     if(userExist)
         return next(new ErrorResponse('User already exist',400));    

    // Create user
    const user=await User.create({
        name,
        email,
        password,
    })

    if(!user)
        return next(new ErrorResponse('Invalid user data',400));   

    sendTokenResponse(user,200,res);

 })



// @desc Logout User / clear cookie
// @route POST/api/users/logout
// @access Private
 const logoutUser=asyncHandler(async(req,res)=>{

     res.cookie('token','none',{
    expires:new Date(Date.now()+10*1000),
    httpOnly:true,
    secure: process.env.NODE_ENV === 'production' // only over HTTPS in production
  })

  res.status(200).json({
    success:true,
    data:{}

  })
    
 })


// @desc Get user profile
// @route POST/api/users/profile
// @access Private

const getUserProfile=asyncHandler(async(req,res)=>{
     const user=await User.findById(req.user._id);
    if(!user)
         return next(new ErrorResponse('user not found',404)); 

  res.status(200).json({
    success:true,
    data:user,

  })
})



// @desc Update user profile
// @route PUT/api/users/profile
// @access Private

const updateUserProfile=asyncHandler(async(req,res,next)=>{

  const user=await User.findById(req.user._id);
    if(!user)
         return next(new ErrorResponse('user not found',404)); 
    console.log(req.body.name)
    user.name=req.body.name || user.name
    user.email=req.body.email || user.email

    if(req.body.password)
        user.password=req.body.password
    const updatedUser=await user.save();

  res.status(200).json({
    success:true,
    data:updatedUser,

  })
})



// @desc Get users
// @route Get/api/users
// @access Private/Admin

const getUsers=asyncHandler(async(req,res)=>{

    const users=await User.find({});
    res.status(200).json(users);


  })




// @desc Get user by ID
// @route Get/api/users/:id
// @access Private/Admin

const getUserByID=asyncHandler(async(req,res)=>{

    const user=await User.findById(req.params.id).select('-password');
    if(!user)
         return next(new ErrorResponse('user not found',404)); 
        
    res.status(200).json(user)
      
  
})



// @desc Delete user
// @route Delete/api/users/:id
// @access Private/Admin

const deleteUser=asyncHandler(async(req,res,next)=>{
    
    const user=await User.findById(req.params.id);
    if(!user)
         return next(new ErrorResponse('user not found',404));

    if(user.isAdmin)
         return next(new ErrorResponse('cannot delete admin user',400));
      
    await User.deleteOne({_id:user._id})
    res.status(200).json({message:'User deleted successfully'});



})



// @desc Update user
// @route PUT/api/users/:id
// @access Private/Admin

const updateUser=asyncHandler(async(req,res,next)=>{
    
  const user=await User.findById(req.params.id);
    if(!user)
         return next(new ErrorResponse('user not found',404));
    user.name=req.body.name || user.name;
    user.email=req.body.email || user.email;
    user.isAdmin=Boolean(req.body.isAdmin)

    const updatedUser=await user.save();
    res.status(200).json(updatedUser)
})



// Get token from model, create cookie and send response

const sendTokenResponse=(user,statusCode,res)=>{

    // create token
    const token=user.getSignedJwtToken()

    // Cookie options
  const options = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
    httpOnly: true, // Cookie not accessible via JS
    sameSite:'strict'
  };

  // For production - secure cookie over HTTPS only
  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  // Send cookie
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      user
    });
}

export{
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    getUserByID,
    deleteUser,
    updateUser,

}