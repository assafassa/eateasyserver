const express=require('express')
const router=express.Router();
const searchController= require('../controllers/searchcontrollers')
const {requireAuth}=require('../middleware/authmiddleware');

router.post('/searchrecipes', searchController.searchrecipe_post);

module.exports=router