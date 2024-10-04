const puppeteer=require('puppeteer')
const fs = require('fs');
const path = require('path');
//search
 async function searchRecipes(searchtype){
    const cacheDir = '/opt/render/.cache/puppeteer/chrome';

    // Check if the cache directory exists
    if (!fs.existsSync(cacheDir)) {
        console.error(`Cache directory does not exist: ${cacheDir}`);
        return; // Exit the function early
    }

    const files = fs.readdirSync(cacheDir);
    console.log('Cache files:', files);

    const browser = await puppeteer.launch({
        headless: true, // Ensure it runs in headless mode
        executablePath: '/opt/render/.cache/puppeteer/chrome/linux-129.0.6668.89/chrome-linux64/chrome', // Explicit path to Chrome
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Important for environments like Render
    });
    console.log("here")
    console.log('Using Chrome executable path:', puppeteer.executablePath());
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