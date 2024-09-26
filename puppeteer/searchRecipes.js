const puppeteer=require('puppeteer')

 async function searchRecipes(searchtype){
    const browser=await puppeteer.launch()
    const page=await browser.newPage()
    await page.setViewport({ width: 1920, height: 5000 });
    await page.goto(`https://www.allrecipes.com/search?q=${searchtype}`)
    
    const searchresults= await page.$$eval('body > main > div > div > div > a',(results)=>{
        return results.map(x=>{
            if (x.querySelector(".mntl-recipe-card-meta")){
                return(
                    {href:x.href,
                    photosrc: x.querySelector("img").src,
                    title: x.querySelector('div:nth-child(2) span span').textContent
                    })  
            }else {
                return undefined
            }
            
        }).filter(result => result !== undefined);
    })
    await browser.close()
    if (searchresults.length==0){
        return('No recipes found.')
    }else{
    return(searchresults)
    }
}

module.exports={searchRecipes}