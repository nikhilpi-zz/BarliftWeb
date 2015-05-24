var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));

app.use("/fonts", gzippo.staticGzip(__dirname + "/dist/fonts"));
app.use("/images", gzippo.staticGzip(__dirname + "/dist/images"));
app.use("/js", gzippo.staticGzip(__dirname + "/dist/js"));
app.use("/css", gzippo.staticGzip(__dirname + "/dist/css"));
app.use("/scripts", gzippo.staticGzip(__dirname + "/dist/scripts"));
app.use("/styles", gzippo.staticGzip(__dirname + "/dist/styles"));
app.use("/views", gzippo.staticGzip(__dirname + "/dist/views"));

// any other routes:
app.use('/*',gzippo.staticGzip(__dirname + "/dist"));

app.listen(process.env.PORT || 5000);