const mongoose = require('mongoose');
const { Schema } = mongoose;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({ 
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// ✅ Apply the plugin to the schema
userSchema.plugin(passportLocalMongoose);

// ✅ Export the model
module.exports = mongoose.model('User', userSchema);
