const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
var campground=require("./models/campgrounds.js");
var seedDB=require("./seeds.js");
// var comment=require("./model/comments.js");


mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser:true,useUnifiedTopology: true});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

seedDB();


// campground.create(
    
//         {name:"goa",image:"https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c72297fd7954cc059_340.jpg",description:"This is goa!! Coastal area ,sunny beach to enjoy!!"}
//     ,(err,campground)=>{
//         if(err){
//             console.log(err);
//         } else{
//             console.log("newly created campground");
//             console.log(campground);
//         }
//     }
// )

//var campgrounds=[
   // {name:"goa",image:"https://pixabay.com/get/52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c72297fd7954cc059_340.jpg"}
   // ,{name:"manali",image:"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72297fd7954cc059_340.jpg"},
   // {name:"shimla",image:"https://pixabay.com/get/57e8d3444855a914f6da8c7dda793f7f1636dfe2564c704c72297fd7954cc059_340.jpg"}
//]

app.get("/",(req,res)=>{
    res.render("landing");
})

app.get("/campgrounds",(req,res)=>{
    campground.find({},(err,allCampgrounds)=>{
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds",{campgrounds:allCampgrounds});
        }
    });
    
})

app.post("/campgrounds",(req,res)=>{
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var newCampground={name:name,image:image,description:desc}
    campground.create(newCampground,(err,newlyCreated)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    })
})

app.get("/campgrounds/new",(req,res)=>{
    res.render("new");
})

app.get("/campgrounds/:id",(req,res)=>{
    //res.send("this will be show page one day");
   campground.findById(req.params.id).populate("comments").exec((err,foundCampground)=>{
       if(err)
       {
           console.log(err);
       }else{
           res.render("show",{campground:foundCampground})
       }
   })
 
})
app.listen("3000",()=>{
    console.log("server is listening!");
})