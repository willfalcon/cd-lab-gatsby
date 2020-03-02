const crypto = require('crypto');

module.exports = function(requestHmac, body, secret) {
  const generatedHmac = crypto
    .createHmac('sha1', secret)
    .update(JSON.stringify(body))
    .digest('hex');
  return generatedHmac === requestHmac;
};
