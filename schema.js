const Joi = require('joi');

const schema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().allow(""),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
});

const reviewschema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required(),
    }).required()
});

// Correctly export both schemas
module.exports = { schema, reviewschema };

