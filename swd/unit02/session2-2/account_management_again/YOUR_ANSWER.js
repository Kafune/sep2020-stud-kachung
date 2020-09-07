const pw = require('./promise-wrappers');

users = [
    {
        "account": "ashlee_waters",
        "username": "ASH"
    },
    {
        "account": "hilario_muller",
        "username": "Hilario_Muller29"
    },
    {
        "account": "serena_klein",
        "username": "Serena.Klein"
    }
];


    Promise.all(users).then((error) => {
        try {
            console.log(users)
        } catch {
            console.log('error');
        }
    })



// pw.writeFileP(`${user.account}`, user.username).then(() => {
//     console.log('done');
// }).catch(err => {
//     console.log(err.message);
// });