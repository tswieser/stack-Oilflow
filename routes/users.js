var express = require('express');
var router = express.Router();
const { User } = require('../db/models')
const bcrypt = require('bcryptjs');
const { csrfProtection, asyncHandler, check, validationResult } = require('./utils');
const db = require('../db/models');
const { loginUser, logoutUser } = require('../auth')

const userValidator = [
  check('first_name')
    .exists({ checkFalsy: true })
    .withMessage("Please enter your first name")
    .isLength({ max: 200 })
    .withMessage("First name can not be greater than 50 characters"),
  check('last_name')
    .exists({ checkFalsy: true })
    .withMessage("Please enter your last name")
    .isLength({ max: 200 })
    .withMessage("last name can not be greater than 50 characters"),
  check('email')
    .exists({ checkFalsy: true })
    .withMessage("Please enter an Email")
    .isLength({ max: 200 })
    .withMessage("Email can not be greater than 50 characters")
    .isEmail()
    .withMessage("Email is not valid")
    .custom((value) => {
      return db.User.findOne({
        where: { email: value }
      }).then((user) => {
        if (user) {
          return Promise.reject("Email already exists, please log in");
        }
      })
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please enter an Password")
    .isLength({ max: 200 })
    .withMessage("Password can not be greater than 50 characters"),
  check("check_password")
    .exists({ checkFalsy: true })
    .withMessage("Please confirm your password")
    .isLength({ max: 200 })
    .withMessage("Password can not be greater than 50 characters")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords don't match");
      }
      return true;
    })
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', csrfProtection, async (req, res) => {
  res.render("new-user", {
    title: "signup",
    csrfToken: req.csrfToken()
  });
})

router.post('/new', csrfProtection, userValidator, asyncHandler(async (req, res, next) => {
  const { user_name, email, first_name, last_name, password, user } = req.body;
  const validationErrors = validationResult(req);

  if (validationErrors.isEmpty()) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      user_name,
      email,
      first_name,
      last_name,
      hashed_password: hashedPassword
    })
    loginUser(req, res, user)
    res.redirect("/");
  } else {
    const errors = validationErrors.array().map((error) => {
      return error.msg;
    })
    res.render('new-user', {
      csrfToken: req.csrfToken(),
      errors
    });
  }
}))

module.exports = router;
