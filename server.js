//server.js
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 8080;
const app = express();
app.use(favicon('build/favicon.ico'));
// the / is the current directory from where the script is running
app.use(express.static('/'));
app.use(express.static(path.join('', 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join('', 'build', 'index.html'));
});
app.listen(port)