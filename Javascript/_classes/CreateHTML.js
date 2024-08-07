import http from 'http';
import { normalizeValue } from '../support.js';

export default class CreateHTML {
    port         = 8080;
    exchangeRate = 5;
    values       = [];

    constructor(port, values, exchangeRate) {
        this.port         = port;
        this.values       = values;
        this.exchangeRate = exchangeRate;
    }

    initServer() {
        http.createServer((req, res) => {
            var html = this.buildHtml(req);

            res.writeHead(200, {
                'Content-Type': 'text/html',
                'Content-Length': html.length,
                'Expires': new Date().toUTCString()
            });
            res.end(html);
        }).listen(this.port);
    }

    buildHtml(req) {
        var html = "";
        html += this.buildHeader();
        html += this.buildBody();
        return html;
    }

    buildHeader() {
        var header = "";
        var pageName = "Crypto Better";

        header += `<!DOCTYPE html>`;
        header += `<html lang="pt-br">`;
        header += `<head>`;
            header += `<meta charset="UTF-8">`;
            header += `<meta name="viewport" content="width=device-width, initial-scale=1.0">`;
            header += `<link href=' http://fonts.googleapis.com/css?family=Inter' rel='stylesheet' type='text/css'>`;
            header += `<title> ${pageName} </title>`;
            header += this.getHtmlStyle();
        header += `</head>`;

        return header;
    }

    getHtmlStyle() {
        const style = `
            <style>
                html, body {
                    margin: 0;
                    height: 100%;
                    font-family: 'Inter';
                    background-color: #b554d4;
                }

                .container {
                    position: relative;
                    width: 100%;
                    margin: 0 auto;
                }

                .title {
                    background: #6d008d;
                    color: white;
                    width: 100%;
                    height: 40px;
                    align-items: center;
                    justify-content: center;
                    display: flex;
                    font-size: 24px;
                }

                .table {
                    display: flex;
                    justify-content: center;
                    margin-top: 15px;
                }

                table {
                    margin-top: 15px;
                    margin-left: 20px;
                    background-color: black;
                    align-self: center;

                    tr {
                        background-color: white;

                        td {
                            text-align: right;
                            padding-right: 15px;
                        }

                        td:first-child {
                            text-align: left;
                            padding-left: 15px;
                        }
                    }

                    tr:first-child {
                        background-color: #05676e;
                        th {
                            min-width: 255px;
                        }
                    }
                }
            </style>`;
        return style;
    }

    buildBody() {
        var body = "";

        body += `<body>`;
            body += `<div class="container">`;
                body += `<div class="title">`;
                    body += `<span>Crypto Better</span>`;
                body += `</div>`;
                body += this.getTable();
            body += `</div>`;
        body += `</body>`;

        return body;
    }

    getTable() {
        var table = "";

        table += `<table>`;
            table += `<tr>`;
                table += `<th>Name</th>`;
                table += `<th>Value (USD)</th>`;
                table += `<th>Change</th>`;
                table += `<th>Change (%)</th>`;
                table += `<th>Value in Real (R$)</th>`;
            table += `</tr>`;
            table += this.values.map(this.treatData.bind(this)).join('');
        table += `</table>`;

        return table;
    }

    treatData(obj) {
        var td = ``;

        var cryptoChange     = 0;
        var cryptoReal       = 0;
        var cryptoName       = obj.name;
        var cryptoPrice      = obj.price1;
        var cryptoChangePerc = obj.price2;

        //* Define value and perc to calc
        var perc  = (cryptoChangePerc.replaceAll("%", "")/100);
        var value = normalizeValue(cryptoPrice);

        //* Remove USD from the name
        cryptoName = cryptoName.substr(0, cryptoName.length-4);

        //* Change = Price * ChangePerc;
        cryptoChange = normalizeValue(value * perc, true);

        //* Convert crypto price USD to BRL value
        cryptoReal = normalizeValue(value * this.exchangeRate, true);

        td += `<tr>`;
            td += `<td>${cryptoName}</td>`;
            td += `<td>${cryptoPrice}</td>`;
            td += `<td>${cryptoChange}</td>`;
            td += `<td>${cryptoChangePerc}</td>`;
            td += `<td>${cryptoReal}</td>`;
        td += `</tr>`;
        return td;
    }
}