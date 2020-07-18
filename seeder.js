const mongoose = require('mongoose'),
Comment = require("./models/comment")
Campground   = require("./models/campground");


data = [
    {
        name : "Himalayas",
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg/405px-Mount_Everest_as_seen_from_Drukair2_PLW_edit.jpg",
        description : " The Himalayas, is a mountain range in Asia separating the plains of the Indian subcontinent from the Tibetan Plateau. The range has many of Earth's highest peaks, including the highest, Mount Everest (Nepal/China)."
    } ,
    {
        name : "Alps",
        image : "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Mont_Blanc_oct_2004.JPG/405px-Mont_Blanc_oct_2004.JPG",
        description : "The Alps are the highest and most extensive mountain range system that lies entirely in Europe, and stretching approximately 1,200 kilometres (750 mi) across eight Alpine countries"
    },
    {
        name : "Varanasi",
        image : "https://cdn.britannica.com/s:700x500/07/153507-050-8E4FD6E3/Boats-Varanasi-Ganges-River-India-Uttar-Pradesh.jpg",
        description : "Varanasi is the India of your imagination. This is one of the world's oldest continually inhabited cities, and one of the holiest in Hinduism."
    },
    {
        name : "Wular lake",
        image : "http://cdn.walkthroughindia.com/wp-content/uploads/2011/04/Wular_Lake.jpg",
        description : "Wular Lake is one of the largest fresh water lakes in Asia and the largest in India, is located in Jammu and Kashmir. It is measures 24 kms across and surrounded by towering mountains, The green water of the Wular Lake is an important natural habitat for fish, a rich population of birds and wildlife."
    },
    {
        name : "Maldives",
        image : "https://media.cntraveler.com/photos/5a7e7a92a2fdaf4c74bb5f37/master/w_820,c_limit/Maldives-GettyImages-160470111.jpg",
        description : "There’s a reason this island cluster in the Indian Ocean has become a honeymoon mainstay: it offers year-round temperatures hovering in the low 80s, and rarely suffers from rain outside monsoon season in November. The best weather, though, is from January through March, when the water is at its calmest and the sky a permanent sapphire-blue."
    }

]



function seedDB(){
    Campground.remove({},(err)=>{
        if(err)
        console.log(err)
        else
        console.log("Removed all campgrounds");

        Comment.remove({},err=>{
           if(err)
           console.log(err)
           else
           console.log("removed comments")

            data.forEach( seed => {
            Campground.create(seed,(err,campground)=>{
            if(err)
            console.log(err);
            else{
                console.log("added a campground")
                Comment.create({
                    text : "Wow this campground is just amazing. I would love to have a visit there",
                    author : "Tushar"
                },(err,comment)=>{
                    if(err)
                    console.log(err);
                    else{
                        campground.comment.push(comment);
                        campground.save();
                        console.log("created new comment");
                    }

                })
            }
            
            });
        });


        })
    
        

    }); 

    
}


module.exports = seedDB