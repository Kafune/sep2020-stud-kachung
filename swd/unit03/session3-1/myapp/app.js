const express = require('express')
const app = express()

let nRequests = 0;


app.get('/', (req, res) => {
    //  res.send('Hello World! ');
     nRequests++;
    console.log(nRequests);
     console.log(req.headers['user-agent']);
})


// console.log(req.headers['user-agent']);

app.listen(3000, () => console.log('Example app listening on port 3000! '))

