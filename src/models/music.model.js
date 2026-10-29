const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({   // MUSIC WHCIH CAN BE CREATED ONLY BY ARTIST
    uri: {
        type:String , 
        required:true
    },
    title: {
        type:String , 
        required:true
    },
    artist: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",  // passed in userModel
        required:true
    }
});
const musicModel = mongoose.model("music" , musicSchema);
module.exports = musicModel;