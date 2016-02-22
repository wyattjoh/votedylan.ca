var nconf = require('nconf').argv().env();
var express = require('express');
var router = express.Router();
var mandrill = require('mandrill-api/mandrill');

/* POST send route. */
router.post('/', function(req, res, next) {
  if (req.body.website && req.body.website != "") {
    console.log("someone sent the website as: " + req.body.website);
    res.json({status: "sent"});
    return;
  }

  var m = new mandrill.Mandrill(process.env.MANDRILL_TOKEN);

  var message = {
    "text": req.body.message,
    "subject": "[votedylan.ca] Contact Message",
    "from_email": req.body.email,
    "from_name": req.body.name,
    "to": [{
      "email": "dbsigurd@ualberta.ca",
      "name": "Dylan Hanwell",
      "type": "to"
    }],
    "headers": {
        "Reply-To": req.body.email
    },
    "auto_html": true
  };

  m.messages.send({"message": message}, function(result) {
    res.json({status: "sent"});
    console.log("Mandrill was sent sucesfully with a status of: " + result[0].status);
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    res.json({status: "error"});
  });
});

module.exports = router;
