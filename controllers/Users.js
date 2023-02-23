
import { addUser, getAllUsers, getOneUser, deleteUser } from "../services/Users.js";
import { usersAllowedUpdates } from '../data/data.js'
import bcrypt from 'bcrypt';

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
        const user = await getOneUser(id);

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
        const existingUser = getOneUser({email: email});
        
        if (existingUser) {
            res.status(400).send({message: "email already in use"});
        
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await addUser(firstName, lastName, email, hashedPassword);
    
            res.status(200).send(newUser);
        }

    } catch(error) {
        console.log(req.body)
        console.log(error);
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
            const user = await getOneUser(id);
    
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
        res.json("login")

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