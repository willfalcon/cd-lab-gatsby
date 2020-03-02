const express = require('express');
const bodyParser = require('body-parser');

const deploy = require('./deploy');
const validate = require('./validate');

const app = express();

app.use(bodyParser.json());

// routes
app.post('/github-trigger-build', validate, deploy, respond);

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status ? err.status : 500);
  res.send(err.message);
});

function respond(req, res, next) {
  res.status = 200;
  res.send(req.deployResponse);
}

const server = app.listen(9301, function() {
  console.log('Listening on port %d', server.address().port);
});
