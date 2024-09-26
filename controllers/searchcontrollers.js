const {searchRecipes}=require("../puppeteer/searchRecipes")

module.exports.searchrecipe_post = async(req, res) => {
  let { stringInput } = req.body
  let searchResults  = await(searchRecipes(stringInput)) 
  console.log(searchResults)
   res.json({searchResults})
  
}
