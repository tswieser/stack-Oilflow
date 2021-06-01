var express = require('express');
var router = express.Router();
const { User } = require('../db/models')
const bcrypt = require('bcryptjs');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');

const userValidator = [
  check('first_name')
    .exists({ checkFalsy: true })
    .withMessage("PLease enter your first name")
    .isLength({ max: 50 })
    .withMessage("First name can not be greater than 50 characters"),
  check('last_name')
    .exists({ checkFalsy: true })
    .withMessage("PLease enter your last name")
    .isLength({ max: 50 })
    .withMessage("last name can not be greater than 50 characters"),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage("PLease enter an Email")
    .isLength({ max: 50 })
    .withMessage("Email can not be greater than 50 characters")
    .isEmail()
    .withMessage("Email is not valid")
    

]






/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});







router.get('/new', csrfProtection, async (req, res) => {
  res.render("new-user", {
    csrfToken: req.csrfToken()
  });
})

router.post('/new', csrfProtection, asyncHandler(async (req, res, next) => {
  const { user_name, email, first_name, last_name, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    user_name,
    email,
    first_name,
    last_name,
    hashed_password: hashedPassword
  })

  res.redirect("/");

}))


module.exports = router;
