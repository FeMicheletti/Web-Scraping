export default class BaseScrap {
    productNameQuery    = "";
    inCashPriceQuery    = "";
    inInstallmentsQuery = "";
    nextPageQuery       = "";
    url                 = "";

    cryptoDefine() {
        this.productNameQuery    = "[aria-label='Name']";
        this.inCashPriceQuery    = "[aria-label='Price (Intraday)'] > fin-streamer";
        this.inInstallmentsQuery = "[aria-label='% Change'] > fin-streamer";
        this.nextPageQuery       = "div[class='W(100%) Mt(15px) Ta(end)'] button:nth-child(4)";
    }
}