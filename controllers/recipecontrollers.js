
const {createrecipeSchema}=require('../models/recipesmongo')

const User= require('../models/users');


async function getrecipes(req){
  let userid=req.decodedToken.id
  let user=await User.findOne({_id:userid})
  let username=user.username
  let email=user.email
  let groceries=user.groceries
  let cart=user.cart
  let usercopy={username,email,groceries,cart}
  //upload recipes
  let {Recipe}= await createrecipeSchema(username);
  return{Recipe,usercopy}
}


module.exports.retrieverecipe_post= async (req, res) => {
    let {Recipe,usercopy}=await getrecipes(req)
    Recipe.find()
        .then (recipes=>{
          res.json({recipes,usercopy});})
        .catch(err => console.log(err));
  
}

module.exports.getusername_get= async(req, res) => {
    let userid=req.decodedToken.id
    let user=await User.findOne({_id:userid})
    let username=user.username
    res.json({username})
  
}

module.exports.logoutfromuser_delete= (req, res) => {
    res.cookie('jwt','',{maxAge:1})
    res.json()
}

module.exports.updatedata_post=async (req,res)=>{
    let {Recipe}=await getrecipes(req)
    const {changes}=req.body;
    changes.forEach(change => {
      let changelink=change[1].link
      Recipe.findOneAndDelete({link: changelink})
        .then(data=>{
          if (change[0]!='DELETE'){
            let recipe= new Recipe(change[1])
            recipe.save()
              .catch((err)=>console.log(err))
          }
        } )
        .catch((err)=>console.log(err))
    });
    res.json({message:'done updating'})
}
  
module.exports.updategroceries_post= async (req, res) => {
  let{username,groceries,cart}=req.body
  
    let messegeback = {};
    
    let userid=req.decodedToken.id
    let user=await User.findOne({_id:userid})

    if (!user) {
        // Handle the case where the user is not found
        messegeback.result = 'User not found.';
        res.json(messegeback);
        return;
    }
    else{
      let name = user.username;
      let pass = user.password;
      let mail = user.email;
      let previous = user.previousmails;
      await User.findOneAndDelete({ username: name });

      let newUser = new User({
          username: name,
          password: pass,
          email: mail,
          previousmails: previous,
          groceries:groceries,
          cart:cart
      });

      await newUser.save();
      messegeback.result = 'new groceries saved';
      res.json(messegeback);
        
    }
  
}
