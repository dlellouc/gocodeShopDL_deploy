
import { addUser, getAllUsers, getOneUserById, getOneUserByEmail, deleteUser } from "../services/Users.js";
import { usersAllowedUpdates } from '../data/data.js'
import bcrypt from 'bcrypt';
// const { sign, verify } = require('jsonwebtoken');
import jwtPkg from 'jsonwebtoken';
const { sign, verify } = jwtPkg;
import express from 'express'

import * as dotenv from 'dotenv'
dotenv.config();
const { JWT_SECRET } = process.env;

export const getAllUsersController = async (req, res) => {
    try {
        const allUsers = await getAllUsers();

        res.status(200).send(allUsers);

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }

};

export const getOneUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getOneUserById(id);

        if (!user) {
            res.status(404).send({ message: 'user does not exist' });
        } else {
            res.status(200).send(user);
        }
    
    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }
}

export const addUserController = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // console.log(req.body)
        const existingUser = await getOneUserByEmail(email);
        
        if (existingUser) {
            // console.log(existingUser)
            res.status(400).send({message: "email already in use"});
        
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await addUser(firstName, lastName, email, hashedPassword);
    
            res.status(200).send(newUser);
        }

    } catch(error) {
        // console.log(req.body)
        // console.log(error);
        res.status(500).send({message:{error}});
    }
}

export const updateUserController = async (req, res) => {
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every((update) => usersAllowedUpdates.includes(update));
    console.log('in update')

    if (!isValidOperation) {
        res.status(400).send({ message: "Invalid updates" });
    } else {
        try {
            const { id } = req.params;
            const user = await getOneUserById(id);
    
            if (!user) {
                res.status(404).send({ message: 'user does not exist' });
            } else {
                updates.forEach((update) => (user[update] = req.body[update]));
                await user.save();
        
                res.status(200).send(user);
            }
        
        } catch(error) {
            console.log(error);
            res.status(500).send({message:{error}});
        }
    }
}

export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await deleteUser(id);

        if (!deletedUser) {
            res.status(404).send({message: "no user with such id"});
        } else {
            res.status(200).send(deletedUser);
        }

    } catch(error) {
        console.log(error);
        res.status(500).send({message:error});
    }
}



export const logInUserController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getOneUserByEmail(email);


        if (!user) {
            res.status(400).send({message: 'user does not exist'});
        
        } else {
            const storedPassword = user.password;
            const isPasswordsMatch = await bcrypt.compare(password, storedPassword);

            
            if (!isPasswordsMatch) {
                res.status(400).send({message: 'Wrong email and password combination'});
            
            } else {
                const accessToken = createToken(user);
                res.status(200).cookie("access-token", accessToken, {
                     maxAge: 1000 * 60 * 60 * 24 * 1,                        // 1 day, in ms   
                     httpOnly: true 
                }).json('logged in');
    
            } 
        }

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }

};

export const getUserProfileController = async (req, res) => {
    try {
        res.json("profile")

    } catch(error) {
        console.log(error);
        res.status(500).send({message:{error}});
    }

};

// code for tokens
const createToken = (user) => {
    const accessToken = sign(
        {id: user._id, email: user.email}, 
        JWT_SECRET);

    return accessToken;
}

// middleware
export const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken) {
        return res.status(400).send({message: "user is not authenticated"})
    }
    
    try {
        const validToken = verify(accessToken, JWT_SECRET);
        if (validToken) {
            req.authenticated = true;   // new variable
            return next();

        }

    } catch(error) {
        return res.status(400).send({message: error})

    }

}