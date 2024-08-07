//* Necessary create this because .concat doesn't work
export function merge (a, b, predicate = (a, b) => a === b) {
    const c = [...a];
    b.forEach((bItem) => {
        c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
    });
    return c;
}

//* Function to remove , from price to calculate
export function normalizeValue(value, toString = false) {
    var newValue = "";

    if (toString) {
        var valueFixed = value.toFixed(2)
        var split = valueFixed.split(".");

        var intSplit = parseInt(split[0]).toLocaleString();
        var decSplit = split[1];

        newValue = intSplit + "." + decSplit;
    } else {
        newValue = value.replaceAll(",", "");
    }

    return newValue;
}

//* Convert Dólar USD in Real BRL
export async function getExchangeRate(cash) {
    //* Use api.exchangerate to capture the last exchange rate
    const apiRequest = await fetch('https://api.exchangerate-api.com/v4/latest/USD');

    //* Get result from apiRequest
    const exchange = await apiRequest.json();

    //* Return exchange rate in Real BRL
    return exchange.rates.BRL;
}