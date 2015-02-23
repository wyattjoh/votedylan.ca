var express = require('express');
var router = express.Router();

/* POST send route. */
router.post('/', function(req, res, next) {
  res.send("lol").end();
});

module.exports = router;
