export default class BaseScrap {
    cryptoNameQuery = "";
    priceQuery      = "";
    percChangeQuery = "";
    nextPageQuery   = "";
    url             = "";

    cryptoDefine() {
        this.cryptoNameQuery = "span .longName";
        this.priceQuery      = "[data-test=change][data-field=regularMarketPrice]";
        this.percChangeQuery = "[data-test=colorChange][data-field=regularMarketChangePercent]:not([data-template=\"({fmt})\"])";
        this.nextPageQuery   = "[data-testid=next-page-button]:not([disabled])";

        /**
         ** OLD PAGE
         ** 
         ** this.cryptoNameQuery = "[aria-label='Name']"; 
         ** this.priceQuery      = "[aria-label='Price (Intraday)'] > fin-streamer"; 
         ** this.percChangeQuery = "[aria-label='% Change'] > fin-streamer";
         ** this.nextPageQuery   = "div[class='W(100%) Mt(15px) Ta(end)'] button:nth-child(4)";
         **/
    }
}