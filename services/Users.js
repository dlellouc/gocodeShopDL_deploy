
import { Users } from '../models/Users.js';

export const getAllUsers = () => {
    return Users.find({});
}

export const getOneUser = (id) => {
    return Users.findOne({ _id: id })
}

export const addUser = (firstName, lastName, email, password) => {
    const newUser = new Users({ firstName: firstName, lastName: lastName, email: email, password: password });
    return newUser.save();
}

export const deleteUser = (id) => {
    return Users.findOneAndDelete({ _id: id })
}