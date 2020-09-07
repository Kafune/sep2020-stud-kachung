let nTaken = 0;

setTimeout(() => {
    console.log('Klaar met taak A');
    //Voeg hier code toe
    if(nTaken == 3) {
        console.log('Klaar met alle taken');
    }
}, Math.random() * 1000);

setTimeout(() => {
    console.log('Klaar met taak B');    
    //Voeg hier code toe
    setTimeout(() => {
        console.log('Klaar met taak A');
        //Voeg hier code toe
        if(nTaken == 3) {
            console.log('Klaar met alle taken');
        }
    }, Math.random() * 1000);
}, Math.random() * 1000);

setTimeout(() => {
    console.log('Klaar met taak C');
    //Voeg hier code toe
    setTimeout(() => {
        console.log('Klaar met taak A');
        //Voeg hier code toe
        if(nTaken == 3) {
            console.log('Klaar met alle taken');
        }
    }, Math.random() * 1000);
}, Math.random() * 1000);

console.log('Klaar met alle taken');