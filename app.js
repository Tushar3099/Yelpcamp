const bodyParser            = require("body-parser"),
      Campground            = require("./models/campground"),
      User                  = require("./models/user"),
      Comment               = require("./models/comment"),
      mongoose              = require("mongoose"),
      passport              = require("passport"),
      LocalStrategy         = require("passport-local"),
      passportLocalMongoose = require("passport-local-mongoose"),
      express               = require("express"),
      seedDB                = require("./seeder")
      app                   = express();
//   seedDB();
app.use(require("express-session")({
    secret : "The study in pink is the s1ep1 in SH",
    resave : false , 
    saveUninitialized : false
}))
const commentRoutes = require("./routes/comment")
const campgroundRoutes = require("./routes/campground")
const indexRoutes = require("./routes/index")

mongoose.connect('mongodb://localhost:27017/yelp_camp',{useNewUrlParser : true , useUnifiedTopology : true})    
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(passport.initialize())
app.use(passport.session())
app.use((req,res,next)=>{
    res.locals.currentuser = req.user;
    next()
})

app.use("/campgrounds/:id/comments",commentRoutes)
app.use("/campgrounds",campgroundRoutes)
app.use(indexRoutes)

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



app.listen(3000,(req,res)=>{
    console.log("Server has started on post 3000 ");
})