const oldScripts = SCRIPTS.filter(script => script.year < 0);
console.log(oldScripts);

const result = oldScripts.reduce((acc, script) => {
    if(script.year < 0) {
        return acc.concat(script);
    }
    return acc;
}, [])

console.log(result.length, oldScripts.length);