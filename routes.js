var express = require('express');
var app = require('./index');
var router = express.Router();


router.post('/insertName', app.insertName);
router.get('/getAll', app.getNames);
router.get('/hello', app.hello);

module.exports = router;