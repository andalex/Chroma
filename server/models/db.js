var mongoose = require('mongoose');
var db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/chroma');

db.on('error', console.error.bind('DB connection failed'));
db.once('open', () => {
    console.log('connected to DB');

});

module.exports = db;
/*
    "palette": [
      "#1FAB89",
      "#62D2A2",
      "#9DF3C4",
      "#D7FBE8"
    ],

    "palette": [
      "#F2F7FF",
      "#0B409C",
      "#10316B",
      "#FFCE63"
    ],
   "palette": [
      "#212121",
      "#323232",
      "#0D7377",
      "#14FFEC"
    ],
   "palette": [
      "#2B2E4A",
      "#E84545",
      "#903749",
      "#53354A"
    ],
       "palette": [
      "#2C3E50",
      "#34495E",
      "#ECF0F1",
      "#BDC3C7"
    ],
*/ 