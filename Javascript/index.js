import ScrapClass from "./_classes/ScrapClass.js";

const scrap = new ScrapClass("http://finance.yahoo.com/crypto/?offset=0&count=100", "crypto", 5);
await scrap.startScrap();

console.log(scrap.scrapedInformations);
console.log(scrap.scrapedInformations.length);