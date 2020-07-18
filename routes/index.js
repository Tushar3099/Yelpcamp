const express  = require("express"),
      router   = express.Router(),
      passport = require("passport"),
      User     = require("../models/user")


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signup")
}

router.get('/',(req,res)=>{
    res.render('home.ejs');
})




//Auth Routes

//LogIn Route
router.get("/login",(req,res)=>{
    const err = null;
    res.render("login",{err : err})
})

router.post("/login",(req,res)=>{
    User.register(new User({username : req.body.username, email : req.body.email}),req.body.password,(err,user)=>{
       if(err){
       console.log(err)
       return res.render("login",{err : err});
       }
       passport.authenticate("local")(req,res,()=>{
           res.redirect("/campgrounds")
       })
    })  
})

//SignUp Route

router.get("/signup",(req,res)=>{
    const err = null;
    res.render("signup",{err : err})
})

router.post("/signup",passport.authenticate("local",{
    successRedirect : "/campgrounds",
    failureRedirect : "/signup",
}),(req,res)=>{
})

//Logout Route

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/campgrounds")
})

module.exports =router