import User from "../models/user_model.js";
import jwt from 'jsonwebtoken';

const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null; //o anki giriş yapan kullanıcı şuanda null.
                next();
            } else {
                const user = await User.findById(decodedToken.userId);
                // neden userId -> user_controllerda jwt oluştururken userId kullandık.
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

const authToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (token) {
            jwt.verify(token, process.env.JWT_SECRET_KEY, (err) => {
                if (err) {
                    console.log(err.message);
                    res.redirect('/login'); //eğer verify olamazsa login sayfasına geri dönecek.
                } else {
                    next();
                }
            });
        } else {
            res.redirect('/login'); //eğer kullanıcının tokeni yoksa login sayfasına geri dönecek.
        }

    } catch (error) {
        res.status(401).json({
            secceded: false,
            error: "not authorized"
        });
    }
}

export { authToken, checkUser }; 