﻿const express = require('express');
const path = require('path');

const { logLineSync } = require('../../utils/utils');

const webserver = express();

const port = 4037;
const logFN = path.join(__dirname, '_server.log');

webserver.use(function(req, res, next) {
  if ( /\.html$/.test(req.path) ) {
    res.setHeader("Content-Type","text/html; charset=windows-1251");
  }
  next();
});

webserver.use(
    "/mysite",
    express.static(path.resolve(__dirname,"../site_football"))
);

webserver.get('*', function(req, res){
  // сюда попадут все get-запросы, не попавшие под предыдущие роуты
  res.status(404).send('<b>ИЗВИНИТЕ!</b> такого файлика - '+req.path+' - у нас нет!');
});

webserver.listen(port);
logLineSync(logFN,"web server running on port "+port);
