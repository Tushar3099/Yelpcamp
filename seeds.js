const mongoose=require("mongoose");
var campground=require('./models/campgrounds.js');
var comment=require("./models/comments.js");

var data=[
   {name:"goa",image:"https://images.unsplash.com/photo-1444210971048-6130cf0c46cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
     description:"coastal area to enjoy,sunny beaches!!"}
   ,{name:"manali",image:"https://images.unsplash.com/photo-1519095614420-850b5671ac7f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description:"a romantic place for couples!!"},
   {name:"shimla",image:"https://images.unsplash.com/photo-1459378560864-f0b73495599c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
      description:"hill station,come on go and make snowman!!"}
]

function seedDB(){
    campground.remove({},(err)=>{
        if(err){
            console.log(err);
        } else{
            console.log("all campgrounds deleted");
            data.forEach((seed)=>{
                campground.create(seed,(err,campground)=>{
                    if(err){
                        console.log(err);
                    } else{
                        console.log("campground added!");
                        comment.create({text:"weak internet connection",author:"ross"},(err,comment)=>{
                            if(err){
                                console.log(err);
                            } else{
                                console.log("comment added!");
                                campground.comments.push(comment);
                                campground.save();

                            }
                            
                        })
                    }
                })
            })
        }
    })
};


module.exports=seedDB;