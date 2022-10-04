import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { clearCache } from 'ejs';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
},
    {
        timestamps: true //Bu modelden veri oluşturulduğunda otomatik olarak dokümana
        // createdAt ve updatedAt adında iki tane değer verir.
    });

userSchema.pre('save', function (next) {
    const user = this;
    console.log("user password before hasing: " + user.password);
    bcrypt.hash(user.password, 10, (err, hash) => {
        user.password = hash;
        console.log("user password after hasing: " + user.password);
        next();
    });
});

const User = mongoose.model('User', userSchema);

export default User;