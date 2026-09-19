import express from 'express'

import {authUser,registerUser,logoutUser,getUserProfile,updateUserProfile,getUsers,getUserByID,updateUser,deleteUser} from '../controllers/userController.js'

const router=express.Router();

import {protect,admin} from '../middleware/auth.js'

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
router.route('/:id').get(protect,admin,getUserByID).put(protect,admin,updateUser).delete(protect,admin,deleteUser);





export default router;