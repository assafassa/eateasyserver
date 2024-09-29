const puppeteer=require('puppeteer')

 async function extractRecipe(recipeUrl){
    
    const browser=await puppeteer.launch()
    const page=await browser.newPage()
    await page.setViewport({ width: 1920, height: 5080 });
    await page.goto(recipeUrl)
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

const hreflist=[        
    {      
      href: 'https://www.allrecipes.com/recipe/8201/strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/-4lsK2dpn-_-znBKBlCpIYm2jig=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8201-strawberry-shortcake-ddmfs-5775-hero-3x4-47272b202c594de0a4221f3a7cab4087.jpg',
      title: 'Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/22988/scrumptious-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/jFXnLD0-pk3-2pwQB9U-_uDKc-4=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/642015-35b313375f144d308040c606047b6dfb.jpg',
      title: 'Scrumptious Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/218000/cottage-pudding-cake-for-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/tzO__zWBqrDoSq4D7h8QeCcurw0=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1130792-50c8cc47596c4d02b54439852ace4fa9.jpg',
      title: 'Cottage Pudding (Cake for Strawberry Shortcake)'
    },
    {
      href: 'https://www.allrecipes.com/recipe/228308/old-fashioned-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/OvQ-via443viY4c4BHCNPe66mEM=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4509389-old-fashioned-strawberry-shortcake-Dixie-4x3-1-280dfc76becb4279bfb46729cb01c0d9.jpg',
      title: 'Old-Fashioned Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/244201/chef-johns-classic-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/4UtcilBAKaN6TsjDHeyq95ydayU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2377260-517c29a9a314446982c6dae4143e9414.jpg',
      title: "Chef John's Classic Strawberry Shortcake"
    },
    {
      href: 'https://www.allrecipes.com/recipe/220168/buttermilk-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/Da5Ub1AVr5YrihTpKQ7vNaZK3Vw=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/837619-3f6d89b4e15d4c96bc7bd49a4add036e.jpg',
      title: 'Buttermilk Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/22987/red-white-and-blue-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/NNLze_PMjPMqcrqbQGtURCJqPH8=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/3717320-11837e38c82b44809bf111091cacf8a7.jpg',
      title: 'Red, White, and Blue Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/frangipane-strawberry-shortcake-recipe-8649786',
      photosrc: 'https://www.allrecipes.com/thmb/N8k9q527d4q8i1yFEA7DwJNUgnU=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8649786_Frangipane-Strawberry-Shortcakes_John-Mitzewich_4x3.2-fdce7668f160482596315f61e450fba1.jpg',
      title: 'Frangipane Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/238046/glazed-doughnut-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/eJKGwIhavNwZPB_1e7xuMu4XF_8=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/1135401-21d4e73b403b40c1b6a5c4458a9300d3.jpg',
      title: 'Glazed Doughnut Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/218004/petras-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/x1rjuPVzbLliDM6__YrP-SfZC9c=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/813675-92f6c643c79d45e3b62614fbb8475f8b.jpg',
      title: "Petra's Strawberry Shortcake"
    },
    {
      href: 'https://www.allrecipes.com/recipe/241997/easy-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/NF0S3qL8TraHd0TzOrA9Sx4Bxdk=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2211487-022223aa32a94de38ec2b31ea389fd97.jpg',
      title: 'Easy Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/16029/chocolate-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/Z_RizONMqbMZkBWRcRns2qktwAw=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8258721-e2772f8b864c43af9f4901b48e95c5db.jpg',
      title: 'Chocolate Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/218005/gluten-free-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/3d_Uhxd4ktNYVquO6DgxsjDm3H0=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/2290893-ed099c72e03c441d9c1e42d9b21aad76.jpg',
      title: 'Gluten-Free Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/strawberry-shortcake-cookies-recipe-8654611',
      photosrc: 'https://www.allrecipes.com/thmb/tz7IS_ihGpkesLta8Xeh2H_Ncns=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8654611-strawberry-shortcake-cookies-ddmfs-5790-hero-3x4-3a5bc6af10ef49fea5d38d001ce444af.jpg',
      title: 'Strawberry Shortcake Cookies'
    },
    {
      href: 'https://www.allrecipes.com/recipe/274976/strawberry-shortcake-ice-cream-cake/',
      photosrc: 'https://www.allrecipes.com/thmb/L5M9lzhzy5UEGcW8e-RP1yWRysY=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/6877011-05b7a51c643444b78203cc5721a8e4c7.jpg',
      title: 'Strawberry Shortcake Ice Cream Cake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/232167/italian-style-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/xx9bRNiIuRpA8pgviGzEjqpPVv8=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/6806640-936a773e52a74dce85e59417faae28d8.jpg',
      title: 'Italian-Style Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/283707/skillet-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/0erXOf_JflMwMDO4MhIEOCaxOIk=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/9110310-bdc80dd8796845b8884241cadf747756.jpg',
      title: 'Skillet Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/218003/quick-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/wvpebd9DUCb5Uw2y11dJdLFaJDs=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8229097-eacad273e5194a1593e67430593c94bc.jpg',
      title: 'Quick Strawberry Shortcake'
    },
    {
      href: 'https://www.allrecipes.com/recipe/236844/strawberry-shortcake-trifle/',
      photosrc: 'https://www.allrecipes.com/thmb/j-fpFXENI3ACPxOvLBg2_mbAgBc=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8116965-8a49b9fdd6504483964c22563eb01b1f.jpg',
      title: 'Strawberry Shortcake Trifle'
    },
    {
      href: 'https://www.allrecipes.com/recipe/238168/super-easy-strawberry-shortcake/',
      photosrc: 'https://www.allrecipes.com/thmb/ZWjbBTINja0EA1HutCkjj6T4Jrs=/282x188/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/6100532-super-easy-strawberry-shortcake-Jessica-Baker-4x3-1-c5f9f64a931e48a7adb01f2c750235ae.jpg',
      title: 'Super-Easy Strawberry Shortcake'
    }
]


// async function logthem (){
//     for (const result of hreflist) {
//         const recipe = await extractRecipe(result.href);
//         console.log(recipe['directions']);
//     }
// }
// logthem()