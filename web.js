var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();
var stripe = require("stripe")(
  "sk_test_76F3sfjMWNDAjAbb66hD0vNo"
);

app.use(morgan('dev'));

app.use(gzippo.staticGzip("" + __dirname + "/dist"));
app.listen(process.env.PORT || 5000);