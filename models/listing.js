const mongoose = require('mongoose');

const schema = mongoose.Schema;
const review = require("./review");
const User = require('./user'); // path to user model
const { string } = require('joi');



const listingschema = new schema({
    title: {
        type: String,
    },
    description : String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country : String,
    owner:{
        type: schema.Types.ObjectId,
        ref: "User"
    },
    reviews : [
        {
            type: schema.Types.ObjectId,
            ref : "Review",
        }
    ],
    category:{
        type: String,
        enum: ['Mountains', 'Arctic','Farms','trending','rooms','Iconic cities','castles','amazing pools','camping'],
    }

})


listingschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
})

const listing = mongoose.model('listing',listingschema);

module.exports = listing;