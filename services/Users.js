
import { Users } from '../models/Users.js';

export const getAllUsers = () => {
    return Users.find({});
}

export const getOneUserById = (id) => {
    return Users.findOne({ _id: id })
}

export const getOneUserByEmail = (email) => {
    return Users.findOne({ email: email })
}

export const addUser = (firstName, lastName, email, hashedPassword) => {
    const newUser = new Users({ firstName: firstName, lastName: lastName, email: email, password: hashedPassword });
    return newUser.save();
}

export const deleteUser = (id) => {
    return Users.findOneAndDelete({ _id: id })
}