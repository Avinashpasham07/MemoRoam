const User = require("../models/user");


module.exports.rendersignup = (req, res) => {
    res.render("users/signup.ejs");
  }



module.exports.signup = async (req, res) => {
  try{
  let {username, email, password} = req.body;
    const newUser = new User({
      username: username,
      email: email
    });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      // req.flash("error", "Please login to continue!");
      const redirectUrl = req.session.redirectUrl || '/listing';
      res.redirect(redirectUrl);
    })

  }
  catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
}

module.exports.renderlogin = (req, res) => {
    res.render("users/login.ejs");
  }


module.exports.login = async(req,res)=>{
    req.flash("success", "Welcome back! to Wanderlust!");
    let redirect = res.locals.redirectUrl || "/listing";
    res.redirect(redirect);
}


module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
      if(err){
        return next(err);
      }
      req.flash("success", "you have logged out successfully!");
      res.redirect("/listing");
    })
  }