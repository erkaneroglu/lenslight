import User from "../models/user_model.js";
import bcrypt from 'bcrypt';

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeded: true,
            user
        });
    } catch (err) {
        res.status(500).json({
            succeded: false,
            err
        });
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
            });
            //eğer böyle bir kullanıcı yoksa alttaki if komutuna girmeden program buradaki hata mesajını döndürür.
        }


        if (passwordIsTrue) {
            res.status(200).send("You are logged in successfully!!");
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

export { createUser, loginUser };