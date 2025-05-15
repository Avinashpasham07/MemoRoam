const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapasync = require("../utils/wrapasync");
const passport = require('passport');
const { saveReditectUrl } = require("../middleware_login");

const usercontroller = require('../controllers/user')

// signup
router
.route("/signup")
// to render signup form
.get( usercontroller.rendersignup)
// for signup
.post( wrapasync(usercontroller.signup));


// login
router
.route("/login")
// to render login form
.get( usercontroller.renderlogin)
// for login
.post(
  saveReditectUrl,
  passport.authenticate("local",
    {failureRedirect : "/login",
      failureFlash:true
    }),
    usercontroller.login)


router.get('/logout',usercontroller.logout)

module.exports = router;