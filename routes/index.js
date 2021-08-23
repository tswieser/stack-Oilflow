var express = require('express');
var router = express.Router();
const { asyncHandler, csrfProtection } = require('./utils')
const { logoutUser } = require('../auth')

/* GET home page. */
router.get('/', function (req, res, next) {
  let user = req.session.auth
  if (!user) {
    return res.render('index');
  } else {
    return res.render('index', { session: user});
  }
});

router.post('/logout', asyncHandler(async (req, res, next) => {
  logoutUser(req, res)
  return res.redirect('/')
}));

module.exports = router;
