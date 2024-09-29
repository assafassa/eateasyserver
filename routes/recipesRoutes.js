const express=require('express')

const {requireAuth}=require('../middleware/authmiddleware');
const router=express.Router();
const recipecontroller=require('../controllers/recipecontrollers')


router.post('/retrieverecipe',requireAuth,recipecontroller.retrieverecipe_post);

router.get('/getusername',requireAuth,recipecontroller.getusername_get);

router.delete('/logoutfromuser',requireAuth, recipecontroller.logoutfromuser_delete);

router.post('/updatedata',requireAuth,recipecontroller.updatedata_post);

router.post('/updategroceries', requireAuth,recipecontroller.updategroceries_post); 



module.exports=router