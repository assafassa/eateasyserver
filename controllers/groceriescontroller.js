const { findingredientid,listfindingredientid } = require("../puppeteer/matchdatabase");

module.exports.groceries_post = async (req, res) => {
  try {
    let { stringInput } = req.body;
    let groceriesSearchResults = await findingredientid(stringInput);
    console.log(groceriesSearchResults);
    res.json({ groceriesSearchResults });
  } catch (error) {
    console.error("Error fetching ingredient results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.grocerieslist_post = async (req, res) => {
  try {
    let { stringInputlist } = req.body;
    let groceriesSearchResults = await listfindingredientid(stringInputlist);
    console.log(groceriesSearchResults);
    res.json({ groceriesSearchResults });
  } catch (error) {
    console.error("Error fetching ingredient results:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};