const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true }, { versionkey: false })

const UserModel = mongoose.model('User', UserSchema)
module.exports = UserModel;