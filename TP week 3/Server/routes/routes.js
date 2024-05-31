import express from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../middlewares/jwt.js";
import { checkToken } from "../middlewares/jwt.js";
import { User } from "../models/User.js";


const routes = express();


routes.post('/register', async (request, response) => {
    const { username, password, firstname, lastname, email } = request.body;

    try {
        const existingUser = await User.find({ username: username }).exec();
        if (existingUser && existingUser.length)
            return response.status(400).json({message: "username is already taken!"});

        const newUser = new User({
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email,
        });
        await newUser.save();

        const token = jwt.sign({}, SECRET, {
            expiresIn: "1h"
        });
        response.cookie("signin_token", token, {maxAge: 1 * 60 * 60 * 1000, httpOnly: true});
        response.status(200).json({user: newUser});
    }
    catch (err) {
        response.status(400).json(err);
    }

});

routes.post('/login', async (request, response) => {
    const { username, password } = request.body;

    if (!username || !password)
        return response.status(400).json({message: "missing username or password"});

    let existingUser = await User.find({ username: username }).exec();
    if ( ! (existingUser && existingUser.length))
        return response.status(400).json({message: "invalid credentials"});
    existingUser = existingUser[0]; // what if there's more than one? Shhh, we don't talk about this!

    try {
        const token = jwt.sign({}, SECRET, {
            expiresIn: "1h"
        });
        response.cookie("signin_token", token, {maxAge: 1 * 60 * 60 * 1000, httpOnly: true});
        response.status(200).json({user: existingUser});
    }
    catch (err) {
        response.status(400).json(err);
    }

});

routes.get('/logout', (request, response) => {
    response.cookie('signin_token', 'none', { maxAge: 5 * 1000, httpOnly: true });
    response.status(200).json({message: "logged out successfully!"});
});

routes.post('/editaccount', checkToken, async (request, response) => {
    const { username, password, firstname, lastname, email } = request.body;

    let existingUser = await User.find({ username: username }).exec();
    if ( ! (existingUser && existingUser.length))
        return response.status(400).json({message: "could not find user"});
    existingUser = existingUser[0]; // what if there's more than one? Shhh, we don't talk about this!

    try {
        existingUser.firstname = firstname;
        existingUser.lastname = lastname;
        existingUser.email = email;
        existingUser.save();
        response.status(200).json({user: existingUser});
    }
    catch (err) {
        response.status(400).json(err);
    }

});





routes.get('/isauth', checkToken, (request, response) => {

    response.status(200).json(request.verified);

});



export default routes;