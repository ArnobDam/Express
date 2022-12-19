const express = require("express");
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send('products listing')
});

module.exports = router;