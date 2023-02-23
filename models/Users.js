import mongoose from "mongoose";

// schemas
const UserSchema = new mongoose.Schema({                
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// model
export const Users = mongoose.model('User', UserSchema);      // Users = collection, row = document