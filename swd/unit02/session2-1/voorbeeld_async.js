const fs = require('fs');

// const data = fs.readFileSync('text.txt', )

fs.readFile('text', (_, data) => {
    console.log(data)
})

