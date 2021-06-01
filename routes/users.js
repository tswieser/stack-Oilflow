var express = require('express');
var router = express.Router();
const { User } = require('../db/models')
const bcrypt = require('bcryptjs');
const { csrfProtection, asyncHandler } = require('./utils');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.get('/new', csrfProtection, async(req, res) => {
  res.render("new-user", {
    csrfToken: req.csrfToken()
  });
})

router.post('/new', csrfProtection, asyncHandler(async(req, res, next) => {
  const { user_name, email, first_name, last_name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    user_name,
    email,
    first_name,
    last_name,
    hashed_password : hashedPassword
  })

  res.redirect("/");
  
}))


module.exports = router;
