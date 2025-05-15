const express = require("express");
const router = express.Router();
exports.router = router;
const wrap = require("../utils/wrapasync") // rename to match
const listing = require('../models/listing');
const { schema } = require('../schema');
const {isLoggedIn, isowner,validateowner}= require('../middleware_login');
const ExpressError = require('../utils/ExpressError'); // ✅ correct

const listingcontroller = require("../controllers/listing")

const multer = require('multer');
const { storage } = require('../cloudConfig');

const upload = multer({storage});

router.get('/properties', async (req, res) => {
  const { category } = req.query;

  try {
    const query = category ? { category } : {};
    const properties = await Property.find(query);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.
    route("/")
    // index page with all listings
    .get(wrap(listingcontroller.index))
    // create new listing
    .post(
        isLoggedIn,upload.single('listing[image]'),validateowner,
        wrap (listingcontroller.createpost)
    );

// new listing form
router.get('/new',isLoggedIn,listingcontroller.newlist);



router
.route("/:id")
// show page for a single listing
.get(wrap(listingcontroller.showlist))
// update route
.put(isLoggedIn,isowner,upload.single('listing[image]'), validateowner, wrap(listingcontroller.updatepost))
// delete route
.delete(isLoggedIn,isowner,wrap(listingcontroller.deletepost));

// ✅ Category route (handles `/category/trending`, `/category/rooms`, etc.)
router.get('/category/:name', async (req, res) => {
    const category = req.params.name;
    
    // Normalize category (e.g., "trending" → "Trending")
    const formattedCategory = 
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    
    // Check if valid
    const validCategories = ['Mountains', 'Arctic', 'Farms', 'Trending', 'Rooms', 'Iconic cities', 'Castles', 'Amazing pools', 'Camping'];
    
    if (!validCategories.includes(formattedCategory)) {
        return res.status(404).render('error', { message: 'Category not found' });
    }

    try {
        const listings = await listing.find({ category: formattedCategory });
        res.render('listings/category', { listings, category: formattedCategory });
    } catch (err) {
        res.status(500).send(err);
    }
});
// edit route
router.get('/:id/edit',isLoggedIn,isowner,
    wrap(listingcontroller.editlist))


// search route
router.get('/', wrap(listingcontroller.index));



module.exports = router;