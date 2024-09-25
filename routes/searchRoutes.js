const express=require('express')
const router=express.Router();
const authController= require('../controllers/authcontrollers')
const {requireAuth}=require('../middleware/authmiddleware');

router.post('/', authController.signup_post);


module.exports=router