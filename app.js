var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
//var indexRouter = require('./routes/apiShoplistv1');
const apiShoplistv1 = require('./routes/apiShoplistv1');
const apiShoplistv2 = require('./routes/apiShoplistv2');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/api/v1', apiShoplistv1);
app.use('/api/v2', apiShoplistv2);

module.exports = app;
