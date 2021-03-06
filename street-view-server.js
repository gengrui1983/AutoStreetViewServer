const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./app/routes')(app, {});

app.listen(port, () => {
    console.log('we are live on ' + port);
});