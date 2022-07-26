const mongoose = require( 'mongoose' );
const UserSchema = new mongoose. Schema( {
    discordId: {
        type: String,
        required: true,
        unique: true,
    },
    discordTag: {
        type: String,
        required: true,
    },
    avatar: {
        required: true,
        type: String,
    },
    guilds: {
        type: Array,
        required: true,
    },
    
})

module.exports = mongoose.model('User', UserSchema)