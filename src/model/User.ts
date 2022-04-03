import { Schema, model } from 'mongoose'

const User = new Schema({
    nickname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    referralLink: {
        type: String,
        required: true
    },
    referrals: {
        type: Array,
    },
    role: {
        type: String,
        default: 'User',
        required: true
    },
})

export default model('User', User)