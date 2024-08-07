import ScrapClass from "./_classes/ScrapClass.js";
import CreateHTML from "./_classes/CreateHTML.js";
import { getExchangeRate } from "./support.js";

const scrap = new ScrapClass("http://finance.yahoo.com/crypto/?offset=0&count=100", "crypto", 2);
await scrap.startScrap();

const exchangeRate = await getExchangeRate();

const html = new CreateHTML(8080, scrap.scrapedInformations, exchangeRate);
html.initServer();

//! Things to Do
//* Pagination for table
//* Graphics
//* Improve page styling
//* Change the color of "crypto changes" to red if it decreases or green if it increases
//* Thing in a better name to my big web site??? kkkkkkkkkkk