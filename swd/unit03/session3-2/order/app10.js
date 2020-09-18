/** Middleware tussen twee routehandlers in  **/
var express = require('express');

var app = express();

app.use('/vogels', function(req, res, next) {
    console.log("A");
    return next();
});
// app.get('/', function(req, res) {
//     console.log("B");
//     res.send("klaar!");
//     console.log("C");
// });
app.use(function(req, res, next) {
    console.log("D");
    return next();
});
app.get('/vogels', function(req, res) {
    console.log("E");
    res.send("echt klaar");
});
// D, A , E
app.listen(3000);