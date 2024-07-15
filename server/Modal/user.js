const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    phone:{
        type:Number,
        required:true
    }
}, { timestamps: true });


const Auth = mongoose.model('user', AuthSchema);

module.exports = Auth;