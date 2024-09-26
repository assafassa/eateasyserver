const {searchRecipes}=require("../puppeteer/searchRecipes")

module.exports.searchrecipe_post = async(req, res) => {
  let { searchInput } = req.body
  let searchResults  = await(searchRecipes(searchInput)) 
  console.log(searchResults)
   res.json({searchResults})
  
}
