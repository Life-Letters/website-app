var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var fs = require('fs');
var _ = require('lodash');

var app = express();
var port = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(port);

console.log('listening on '+port);
