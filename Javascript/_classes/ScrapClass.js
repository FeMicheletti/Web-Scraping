import puppeteer from "puppeteer";
import BaseScrap from "./BaseScrap.js";
import { merge } from "../support.js"

export default class ScrapClass extends BaseScrap {
    scrapedInformations = [];
    hasNextPage         = true;
    maxPages            = 0;

    constructor(url, type, maxPages) {
        super();
        this.url      = url;
        this.maxPages = maxPages;

        switch (type) {
            case "crypto":
                this.cryptoDefine();
                break;
        }
    }

    async startScrap() {
        //* Init the browser using the puppeteer
        await this.initBrowser();

        //* Init page passed in constructor
        await this.initPage();

        //* Scrap the prices of all products
        await this.scrapInfo();

        //* Close the browser
        await this.closeBrowser();
    }

    async initBrowser() {
        this.browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null
        });
    }

    async initPage() {
        console.log(this.browser);
        this.page = await this.browser.newPage();

        await this.page.setCacheEnabled(false);
        await this.page.goto(this.url, {
            waitUntil: "domcontentloaded",
        });
    }

    async scrapInfo() {
        if (this.maxPages == 0) return;

        const quotes = await this.page.evaluate((thisClass) => {
            //* Verify if has next page
            thisClass.hasNextPage = document.querySelectorAll(thisClass.nextPageQuery);

            //* Get values and put in an array
            const nameSelector   = document.querySelectorAll(thisClass.productNameQuery);
            const price1Selector = document.querySelectorAll(thisClass.inCashPriceQuery);
            const price2Selector = document.querySelectorAll(thisClass.inInstallmentsQuery);

            return Array.from(nameSelector).map((el, i) => {
                const name   = nameSelector[i].innerText;
                const price1 = price1Selector[i].innerText;
                const price2 = price2Selector[i].innerText;
                return { name: name, price1: price1, price2: price2 }
            });
        }, this);

        this.scrapedInformations = merge(this.scrapedInformations, quotes);

        //* If has, go to next page
        if (this.hasNextPage) {
            this.maxPages--;
            await this.nextPage();
            await this.scrapInfo();
        }
    }

    async nextPage() {
        await this.page.click(this.nextPageQuery);
    }

    async closeBrowser() {
        await this.browser.close();
    }
}