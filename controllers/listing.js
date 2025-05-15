const { isLoggedIn, isowner } = require("../middleware_login");
const listing = require("../models/listing");;
const { router } = require("../routes/listing");
const wrap = require("../utils/wrapasync");
const ExpressError = require('../utils/ExpressError'); // ✅ correct if file is utils/express.js



// to get index 
module.exports.index = async(req,res)=>{
    let allist = await listing.find({})
    res.render('index',{allist});
    }

// to get new list form
module.exports.newlist = (req,res)=>{
    res.render('new');
}

// // to get single list 
module.exports.showlist = async(req,res)=>{
    let {id} = req.params;
    if (id === "new") {
        return res.render("new"); 
    }
   let list = await listing.findById(id).
   populate({
    path:"reviews",
    populate: {
        path:"author"
    }
}).
   populate("owner");


    if(!list) {
        req.flash('error','Listing you are looking for does not exist!')
        return res.redirect('/listing');
    }
    // console.log(list);
    res.render('show',{list});
}


// to create post 
module.exports.createpost = async(req,res,next)=>{
    try {
        if(!req.file) {
            throw new ExpressError(400, 'Image is required');
        }
        
        let url = req.file.path;
        let filename = req.file.filename;
        
        const newlisting = new listing(req.body.listing);
        newlisting.owner = req.user._id;
        newlisting.image = {url, filename};
        
        await newlisting.save();
        req.flash('success','New listing created!');
        res.redirect('/listing');
    } catch (err) {
        req.flash('error', err.message);
        res.redirect('/listing/new');
    }
}

// to edit list
module.exports.editlist = async(req,res)=>{
    let{id}= req.params;
    const list = await listing.findById(id);
    if(!list) {
        req.flash('error','Listing you are looking for does not exist!')
        return res.redirect('/listing');
    }
    res.render('edit',{list});
}

// to update list 
module.exports.updatepost = async (req, res) => {
    let { id } = req.params;

    
     let updatedListing = await listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

     if(typeof  req.file !== 'undefined') {
    let url = req.file.path;
    let filename =req.file.filename;

    updatedListing.image = {url, filename};
    await updatedListing.save();
     }

    req.flash('success','Listing updated!')
    if (!updatedListing) {
        throw new Error("Listing not found");
    }

    res.redirect(`/listing/${id}`);
}

// to delete list
module.exports.deletepost = async(req,res)=>{
    let{id}= req.params;
    let del = await listing.findByIdAndDelete(id);
    req.flash('success','Listing deleted!')
    console.log(del);    
    res.redirect('/listing');
}

// to search listing
module.exports.index = async(req, res) => {
    const { q } = req.query;
    
    let allist;
    if (q) {
        // Search functionality
        const regex = new RegExp(q, 'i');
        allist = await listing.find({
            $or: [
                { title: regex },
                { description: regex },
                { location: regex },
                { category: regex }
            ]
        });
    } else {
        // Normal index view
        allist = await listing.find({});
    }
    
    res.render('index', {
        allist,
        currentUser: req.user,  // Make sure to pass currentUser
        searchMode: !!q,       // Convert to boolean
        searchQuery: q || ''   // Ensure searchQuery is always defined
    });
}