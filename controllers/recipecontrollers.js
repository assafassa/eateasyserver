
const {createrecipeSchema}=require('../models/recipesmongo')

const User= require('../models/users');


async function getrecipes(req){
  let userid=req.decodedToken.id
  let user=await User.findOne({_id:userid})
  let username=user.username
  //upload recipes
  let {recipe}= await createrecipeSchema(username);
  return(recipe)
}


module.exports.retrieverecipe_post= async (req, res) => {
    let Recipe=await getrecipes(req)
    Recipe.find()
        .then (recipes=>{
          res.json({recipes});})
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
    let Recipe=await getrecipes(req)
    const {changes}=req.body;
    changes.forEach(change => {
      let changeid=change[1].Id
      Recipe.findOneAndDelete({Id: changeid})
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
  