var express = require('express');
var router = express.Router();
const app = require('../app.js')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/new', async(req, res) => {




})



module.exports = router;
