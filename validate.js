const fs = require('fs');
const checkHmac = require('./hmacChecker');

module.exports = function(req, res, next) {
  if (
    !req.header['x-hub-signature'] ||
    !req.headers['x-hub-signature'].length >= 5
  ) {
    const err = new Error(
      'You must include x-hub-signature header. See github docs.'
    );
    err.status = 401;
    return next(err);
  }

  if (!process.env['DEPLOY_KEY']) {
    const err = new Error('I do not have a secret for this site.');
    err.status = 401;
    return next(err);
  }

  const requestHmac = req.headers['x-hub-signature'].substring(5);
  const secret = process.env['DEPLOY_KEY'];

  if (!checkHmac(requestHmac, req.body, secret)) {
    const err = new Error('HMAC Failed!');
    err.status = 403;
    return next(err);
  }

  if (!fs.existsSync(`${__dirname}/scripts/gatsby-build.sh`)) {
    const err = new Error('I do not have a deploy script for this site.');
    err.status = 404;
    return next(err);
  }

  next();
};
