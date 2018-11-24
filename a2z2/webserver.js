var express = require('express');
var app = express();


// set the view engine to ejs
app.set('view engine', 'ejs');

app.listen(1002);
console.log('1002 is the magic port');

app.use(express.static('public'));
