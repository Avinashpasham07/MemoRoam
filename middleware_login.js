const listing = require("./models/listing");
const { ExpressError } = require("./utils/ExpressError")
const {schema,reviewschema} = require("./schema"); 
const Review = require("./models/review");


module.exports.isLoggedIn = (req, res, next) => {
    
    if (!req.isAuthenticated()) {
        // redirect url saved 
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must login to do that!");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveReditectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
        }
        next();
}

module.exports.isowner = async (req,res,next)=>{
    let { id } = req.params;
    let list = await listing.findById(id)
    if(!list.owner._id.equals(res.locals.currentUser._id)){
        req.flash('error',"you are not the owner of this listing")
        return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateowner = (req,res,next)=>{
        if (!req.body.listing) {
            throw new Error("Invalid request: Missing listing data");
        }
        console.log(req.body.listing);
        let result = schema.validate(req.body);
    if(result.error){
        throw new ExpressError(400, result.error.details[0].message);
    } 
        else {
            next();
        }
    };

module.exports.validatereview = (req, res, next) => {
    console.log(req.body); // Debugging line
    let { error } = reviewschema.validate(req.body);
    if (error) {
        let errmsg = error.details.map((el) => el.message).join(",");
        return res.status(400).send(errmsg); // Better error handling
    }
    next();
};

module.exports.isReviewAuthor = async (req,res,next)=>{
    let {id, reviewId } = req.params;
    let review = await Review.findById(reviewId)
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash('error', "You are not the author of this review."); // ✅
        return res.redirect(`/listing/${id}`);
    }
    next();
}