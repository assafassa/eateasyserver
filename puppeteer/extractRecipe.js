const puppeteer=require('puppeteer')

 async function extractRecipe(recipeUrl){
    
  const browser = await puppeteer.launch({
     defaultViewport: null, 
      headless: true, // Run in headless mode
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Add these arguments for server environments
  });
    const page=await browser.newPage()
    await page.setViewport({ width: 1920, height: 5080 });
    await page.goto(recipeUrl, {
      waitUntil: 'networkidle2', // Wait for the network to be idle
    });
    const recipeHead=await page.$eval('body > main > article', (article) => {
        return({
        title: article.querySelector("h1").textContent,
        photosrc: article.querySelector("img").src,
        detailLable:Array.from(article.querySelectorAll("div.mm-recipes-details__label"))
        .map(part => part.textContent),
        detailValue:Array.from(article.querySelectorAll("div.mm-recipes-details__value"))
        .map(part => part.textContent),
        ingredients: Array.from(article.querySelectorAll("li.mm-recipes-structured-ingredients__list-item "))
            .map(ingredient => {
                const pElement = ingredient.querySelector('p'); // Correct reference to ingredient
                const spans = pElement ? pElement.querySelectorAll('span') : [];
                return {
                    amount: spans[0] ? spans[0].textContent.trim() : '',
                    unit: spans[1] ? spans[1].textContent.trim() : '',
                    name: spans[2] ? spans[2].textContent.trim() : ''
                };
            }),
        directions: Array.from(article.querySelectorAll("p.comp.mntl-sc-block.mntl-sc-block-html"))
        .map(part => part.textContent.trim('/n')),
        nutritionLabel:['Calories','Fat','Carbs','Protein'],
        nutritionValue:Array.from(article.querySelectorAll("td.mm-recipes-nutrition-facts-summary__table-cell"))
        .map(part => part.textContent)
    })
    });
    
    
    await browser.close()
    return(recipeHead)
}
module.exports = {extractRecipe}
