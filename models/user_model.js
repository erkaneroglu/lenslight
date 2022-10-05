import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username are is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, "Only alphanumeric characters are allowed"],
    },
    email: {
        type: String,
        required: [true, 'Email area is required'],
        unique: true,
        validate: [validator.isEmail, "Valid email required"],
    },
    password: {
        type: String,
        required: [true, "Password are is required"],
        minLength: [4, "Password must be at least 4 characters"],
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