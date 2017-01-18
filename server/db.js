var Sequelize = require('sequelize');
var sequelize = new Sequelize('postgres://alexanderson:abc@localhost:5432/chromacolor', {
  logging: false
});

var test = sequelize.define('test', {
    test: {
        type: Sequelize.STRING,
        field: 'testname'
    }
}, {
    freezeTableName: true
});
module.exports = test;
