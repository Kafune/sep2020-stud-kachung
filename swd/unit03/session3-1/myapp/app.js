const express = require('express')
const app = express()

let nRequests = 0;


app.get('/', (req, res) => res.send('Hello World! '))

nRequests++;
console.log(nRequests);

app.listen(3000, () => console.log('Example app listening on port 3000! '))

