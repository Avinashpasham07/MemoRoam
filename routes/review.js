const express = require("express");
const router = express.Router({mergeParams:true});
exports.router = router;
const Review = require('../models/review');
const ExpressError = require('../utils/ExpressError'); // ✅ correct
const wrapasync = require('../utils/wrapasync');
const listing = require('../models/listing');
const { isLoggedIn,validatereview,isReviewAuthor} = require("../middleware_login")


const reviewcontroller = require("../controllers/review")

// reviews 
// post route
router.post("/",isLoggedIn,validatereview ,wrapasync(reviewcontroller.createreview))

// delete reviews
router.delete("/:reviewId",
   isLoggedIn,isReviewAuthor,wrapasync(reviewcontroller.deletereview))

module.exports = router;
