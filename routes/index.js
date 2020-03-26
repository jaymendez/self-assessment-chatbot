var express = require('express');
var router = express.Router();
const verificationController = require("../controllers/verification");
const messageWebhookController = require("../controllers/messageWebhook");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   console.log(req.query);
//   res.render('index', { title: 'Express' });
// });
router.get("/link", verificationController);
router.post("/link", messageWebhookController);

module.exports = router;
