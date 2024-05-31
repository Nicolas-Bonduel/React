import jwt from 'jsonwebtoken';

export const SECRET = "Shhhh! Don't tell anyone!";

export const checkToken = (request, response, next) => {
    const token = request.cookies.signin_token;
    if (!token) {
        return response.status(401).json({message: 'Unauthorized'});
    }

    try {
        request.verified = jwt.verify(token, SECRET);
        next();
    }
    catch(err) {
        return response.status(400).json({message: 'Token is invalid'});
    }
}