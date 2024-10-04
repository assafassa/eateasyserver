const puppeteer=require('puppeteer')


async function findingredientid(searchstring){
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // These options prevent issues with sandboxing
        headless: true, // Ensures headless mode for cloud environments
      });
    const page=await browser.newPage()
    await page.setViewport({ width: 1920, height: 1000 });
    await page.goto(`https://www.foodb.ca/unearth/q?utf8=%E2%9C%93&query=${searchstring}&searcher=foods&button=`, {
        waitUntil: 'networkidle2', // Wait for the network to be idle
    });
    const databaseid=await page.$$eval('body > main > div.unearth-search-results.unearth-food-search-results>div', (results) => {
        return results.map(x=>{
            if (x.querySelector(".unearth-search-details .result-link")){
                data=x.querySelectorAll("a")
                return(
                    {id: data[0].textContent,
                    hitname: data[1].textContent
                    })  
            }else { 
                return undefined
            }
        })
    })
    await browser.close()
    
    return(databaseid)
    
}

async function listfindingredientid(ingredients) {
    const ingredientIds = await Promise.all(ingredients.map(async (ingredient) => {
        
        return await findingredientid(ingredient);
    }));
    return ingredientIds;
}


module.exports = {findingredientid,listfindingredientid}