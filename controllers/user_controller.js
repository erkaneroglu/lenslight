import User from "../models/user_model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({
            user: user._id
        });
    } catch (err) {

        let errs = {};

        if (err.code === 11000) {
            errs.email = 'The email address is already in use. Please try again';
        }

        if (err.name === "ValidationError") {
            Object.keys(errs).forEach(key => {
                errs[key] = err.errs[key].message;
            });
        }

        res.status(400).json(errs);
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await User.findOne({ username });
        let passwordIsTrue = false; //ilk olarak false olarak tanımladık.

        if (user) { //eğer böyle bir kullanıcı varsa
            passwordIsTrue = await bcrypt.compare(password, user.password);
            // eğer kullanıcının girdiği password ile dbdeki password alanı eşleşirse "true" dönecek, yanlış ile "false" olarak kalacak.
        } else {
            return res.status(401).json({
                succeded: false,
                error: "There is  no such user"
            }); //eğer böyle bir kullanıcı yoksa alttaki if komutuna girmeden program buradaki hata mesajını döndürür.
        }


        if (passwordIsTrue) {

            const token = createToken(user._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            });

            res.redirect('/users/dashboard');

        } else {
            res.status(401).json({
                succeded: false,
                error: "Passwords do not match!!",
            });
        }
    } catch (err) {
        res.status(500).json({
            succeded: false,
            err
        });
    }
};

// JWT Validation Using
const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d"
    });
}


const getDashboardPage = (req, res) => {
    res.render('dashboard', {
        link: "dasboard",
    });
}

export { createUser, loginUser, getDashboardPage };