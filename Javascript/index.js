import ScrapClass from "./_classes/ScrapClass.js";
import CreateHTML from "./_classes/CreateHTML.js";
import { getExchangeRate } from "./support.js";

//* Class to scrap information from an site (In this case is yahoo)
const scrap = new ScrapClass("https://finance.yahoo.com/crypto/?offset=0&count=100", "crypto", 1);
await scrap.startScrap();

const exchangeRate = await getExchangeRate();

const html = new CreateHTML(8080, scrap.scrapedInformations, exchangeRate);
html.initServer();