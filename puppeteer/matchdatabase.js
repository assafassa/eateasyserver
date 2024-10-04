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
    // Launch the browser only once
    const browser = await puppeteer.launch({
        executablePath: process.env.NODE_ENV === 'production' ? process.env.PUPPETEER_EXCUTABLE_PATH : puppeteer.executablePath(),
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--single-process', '--no-zygote']
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 200 });

    const ingredientIds = [];

    // Loop through each ingredient and use the same page for each
    for (let ingredient of ingredients) {
        try {
            // Navigate to the search page for each ingredient
            await page.goto(`https://www.foodb.ca/unearth/q?utf8=%E2%9C%93&query=${ingredient}&searcher=foods&button=`, {
                waitUntil: 'networkidle0', // Wait for no network requests for 500ms
                timeout: 10000 // Adjust timeout if needed
            });

            // Extract the relevant data from the page
            const result = await page.$$eval('body > main > div.unearth-search-results.unearth-food-search-results>div', (results) => {
                return results.map(x => {
                    if (x.querySelector(".unearth-search-details .result-link")) {
                        let data = x.querySelectorAll("a");
                        return {
                            id: data[0].textContent.trim(),
                            hitname: data[1].textContent.trim()
                        };
                    } else {
                        return [];
                    }
                });
            });


        } catch (error) {
            console.error(`Error fetching ingredient "${ingredient}":`, error);
            
        }
    }

    // Close the browser after processing all ingredients
    await browser.close();

    return ingredientIds;
}




module.exports = {findingredientid,listfindingredientid}