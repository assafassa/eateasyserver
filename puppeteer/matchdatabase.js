const puppeteer=require('puppeteer')


async function findingredientid(searchstring,height,timeout){
    const browser = await puppeteer.launch({
        executablePath: process.env.NODE_ENV==='production' ?process.env.PUPPETEER_EXCUTABLE_PATH
            : puppeteer.executablePath() ,   
            headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox','--single-process','--no-zygote']
            });
    const page=await browser.newPage()
    await page.setViewport({ width: 800, height: height });
    await page.goto(`https://www.foodb.ca/unearth/q?utf8=%E2%9C%93&query=${searchstring}&searcher=foods&button=`, {
        waitUntil: 'networkidle0', // Wait for no network requests for 500ms
        timeout: timeout // Wait for the network to be idle
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
        
        return await findingredientid(ingredient,200,10000);
    }));
    return ingredientIds;
}


module.exports = {findingredientid,listfindingredientid}