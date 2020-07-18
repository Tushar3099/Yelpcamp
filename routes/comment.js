const express     = require("express"),
      router      = express.Router({mergeParams : true}),
      Comment     = require("../models/comment"),
      Campground  = require("../models/campground")


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/signup")
    }

router.get("/new",isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id ,(err,campground)=>{
        if(err)
        console.log(err)
        else
        res.render("newComment.ejs",{campground : campground})
    })
    
})

router.post("/",isLoggedIn,(req,res)=>{
    Campground.findById(req.params.id,(err,campground)=>{
        if(err)
        console.log(err)
        else{
            const comment = req.body.comment;
            console.log(comment)
            Comment.create(comment,(err,madeComment)=>{
               if(err)
               console.log(err)
               else{
                console.log(madeComment);
                const id = req.user._id
                const username = req.user.username
                madeComment.author.id = id;
                madeComment.author.username = username;
                madeComment.save()
                campground.comment.push(madeComment);
                campground.save();
                console.log("created new comment");
               }
               console.log(req.params.id)
               res.redirect("/campgrounds/"+req.params.id)
            })
        }
    })
    
    // res.redirect("/campground/"+req.body.id)
})

module.exports =router