const express     = require("express"),
      router      = express.Router(),
      Campground  = require("../models/campground")

      function isLoggedIn(req,res,next){
         if(req.isAuthenticated()){
             return next()
         }
         res.redirect("/signup")
         }


// Index
router.get('/',(req,res)=>{
    Campground.find({},(err,allcampgrounds)=>{
       if(err)
       console.log(err)
       else
       res.render("camp.ejs",{campgrounds : allcampgrounds , currentuser : req.user});
   })            
})

// New
router.get('/new',isLoggedIn, (req,res)=>{
   res.render('new.ejs'); 
})

// Create
router.post('/',(req,res)=>{
   const name = req.body.name;
   const image = req.body.image;
   const description = req.body.description;
   var newcampGround = { name: name, image: image , description: description};
     Campground.create(newcampGround,(err,campground)=>{
     if(err)
     console.log(err)
     else{
         campground.creater.username = req.user.username;
         campground.creater.id = req.user._id;
         campground.save();
     }
 })
   res.redirect('/');

})

// Show route
router.get('/:id',(req,res)=>{
   const id = req.param('id');
   Campground.findById(id).populate("comment").exec((err,campground)=>{
       if(err)
       console.log(err);
       else{
           console.log(campground);
           res.render('show.ejs',{campground: campground});
       }
       
   })
   
})

module.exports =router