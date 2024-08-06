//* Necessary create this because .concat doesn't work
export function merge (a, b, predicate = (a, b) => a === b) {
    const c = [...a];
    b.forEach((bItem) => {
        c.some((cItem) => predicate(bItem, cItem)) ? null : c.push(bItem)
    });
    return c;
}