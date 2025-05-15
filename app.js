if(!process.env.NODE_ENV === 'production'){
require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrap = require("./utils/wrapasync");
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const mongostore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

// exporting the modules for all
const listingRoutes = require("./routes/listing"); 
const reviewRoutes = require("./routes/review");
const userRoutes = require("./routes/user");
const { error } = require('console');
// database url
const dburl = process.env.ATALSDB_URL ;

// setting up ejs and public folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,'/public')))


// setting up session and flash
const store = mongostore.create({
    mongoUrl : dburl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600, // time in seconds
    });  
    store.on("error",()=>{
        console.log("Session store error",err);
    }); 

const sessionConfig = {
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7*24 * 60 * 60* 1000, // 7 days
        maxAge: 7*24 * 60 * 60* 1000,               // 7 days
        httpOnly:true,
    }
};

    




app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// connecting to database
main()
.then((res)=>{
    console.log('Connected to Database');
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(dburl);
}
// Add this before your routes
app.use((req, res, next) => {
    // Make these variables available to all views
    res.locals.currentUser = req.user;
    res.locals.searchQuery = req.query.q || '';
    res.locals.searchMode = !!req.query.q;
    next();
});

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    // console.log(res.locals.success);
    next();
})

app.post("/list", (req, res) => {
    console.log(req.body.list); // ✅ This works here
    res.send("Received the form");
});

// for get all listing page action from routes
app.use("/listing", listingRoutes);

// for get all review page action from route
app.use("/listing/:id/reviews", reviewRoutes); 

app.use("/", userRoutes);

// if user types invalid route then response 
app.all('*', (req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// to handle errors
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render('error', { err });
});


app.listen(8080,()=>{
    console.log('Server is running on port 8080');
});




