/* A */

let doAllTasks = (callbackFunction) => {
    setTimeout(() => {
        console.log('Taak 1 klaar');
        setTimeout(() => {
            console.log('Taak 2 klaar');
            setTimeout(() => {
                callbackFunction ({})
            }, Math.random() * 100);
        }, Math.random() * 100);
    }, Math.random() * 100);    
};

/* B */

let printWhenFinished = () => {
    console.log('Alle taken klaar');
    console.log('nu gaan we andere dingen doen');
};

// doAllTasks(printWhenFinished);

/* C */

let doAllTasks2 = (callbackFunction) => {
    let completedTasks = [];
    setTimeout(() => {
        completedTasks.push('Taak 1 klaar');
        setTimeout(() => {
            completedTasks.push('Taak 2 klaar');
            /* C) Plaats je aanpassing op deze regel */
            setTimeout(() => {
                callbackFunction = completedTasks;
                return callbackFunction;
            })
        }, Math.random() * 100);
    }, Math.random() * 100);    
}; 

/* D */
let printResults = (resultList) => {
    console.log('Alle taken klaar, dit zijn de resultaten');
    resultList.forEach((result) => {
        console.log(result);
    });
};

doAllTasks2(printResults);