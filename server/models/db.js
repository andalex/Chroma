var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/chroma');

db.on('error', console.error.bind('DB connection failed'));
db.once('open', () => {
    console.log('connected to DB');

});

module.exports = db;
