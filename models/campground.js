const mongoose = require('mongoose')

var YelpcampSchema = new mongoose.Schema({
    name : String,
    image : String,
    description : String,
    comment : [
                {
                    type : mongoose.Schema.Types.ObjectId ,
                    ref : "Comment"
                }
              ],
    creater : {
                username : String,
                id : {
                        type : mongoose.Schema.Types.ObjectId ,
                        ref : "User"
                     }        
             },
    date : {type : Date , default : Date.now} 
})

module.exports = mongoose.model('Campground',YelpcampSchema);


