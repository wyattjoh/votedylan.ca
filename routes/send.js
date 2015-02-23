var express = require('express');
var router = express.Router();
var Mandrill = require('mandrill-api/mandrill');

/* POST send route. */
router.post('/', function(req, res, next) {
  var m = new mandrill.Mandrill();

  res.send("lol").end();
});

module.exports = router;
