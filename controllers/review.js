const { router } = require("../routes/review");
const listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createreview = async(req,res)=>{
    let list =  await listing.findById(req.params.id);
    let newreview = new Review(req.body.review);
    newreview.author = req.user._id;
 //    console.log(newreview);
    list.reviews.push(newreview);
 
    await newreview.save();
    await list.save();
    req.flash('success','review added!')
    res.redirect(`/listing/${list._id}`);
 
 }


module.exports.deletereview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','review deleted!')
    res.redirect(`/listing/${id}`)
}