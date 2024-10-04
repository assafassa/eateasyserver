const puppeteer=require('puppeteer')
//search
 async function searchRecipes(searchtype){
    const browser = await puppeteer.launch({
        executablePath: '/opt/render/.cache/puppeteer/chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
    const page=await browser.newPage()
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36")
    await page.setViewport({ width: 1920, height: 5000 });
    await page.goto(`https://www.allrecipes.com/search?q=${searchtype}`, {
        waitUntil: 'networkidle2', // Wait for the network to be idle
    });
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
    
    return(searchresults)
    
}

module.exports={searchRecipes}