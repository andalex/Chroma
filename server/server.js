var app      = require('./app');
var colors   = require('colors');

    app.listen((process.env.PORT || 8080), () => {
        console.log(`server: 8080`.blue);
    });
    app.on('error', (e) => {
        console.log(e.red);
    });
