import { Mongoose } from "mongoose";
import {Schema} from Mongoose;
import bcrypt from bcrypt;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowecase: true,
            trim: true, 
        },
        fullName: {
            type: String,
            required: true,
            trim: true, 
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }

    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async (next) =>{

    //.isModified('path(string value)') is a method provided by mongoose to check if an entity is modified.
    if(!this.isModified("password")) return next();


    //syntax: bcrypt.hash(password, saltRounds, callback);
    //  he cost factor or the number of salt rounds. 
    // This determines the complexity of the hashing process. A higher number means more computational work to hash the password,
    //  making it more secure but also more time-consuming. Common values range from 10 to 12.
    this.password = await bcrypt(this.password, 10);
    next();
})



// Salting is the process of adding a unique, random string of characters to each password before hashing it.
//  This random string is called a salt

// When a user creates an account or changes their password, the password is combined with a randomly generated salt.
// The combined string (password + salt) is then hashed using a cryptographic hashing algorithm (like bcrypt, SHA-256, etc.).

// When a user tries to log in, the plaintext password they provide is hashed again using the same algorithm and salt. bcrypt.compare() handles this process internally:

// It extracts the salt from the stored hash.
// It hashes the provided plaintext password using this extracted salt.
// It compares the newly generated hash with the stored hash.
// If they match, the passwords are considered identical; otherwise, they are not.

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}