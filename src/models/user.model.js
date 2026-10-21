import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

const userSchema = new Schema (
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
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true,
        },
        coverImage: {
            type: String,
            required: true,
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
            
        ],
        password: {
            type: String,
            required: [true, 'Password is required!']
        },
        refreshToken: {
            type: String
        },
    }, 
    {
        timestamps: true
    }
)

//Usage of hooks
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10);
    next();
});

//Usage of methods
userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);


// In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

// Therefore, a JWT typically looks like the following:

// xxxxx.yyyyy.zzzzz
// [Header].[Payload].[Signature]

// The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.
// {
//   "alg": "HS256",
//   "typ": "JWT"
// }


// The second part of the token is the payload, which contains the claims. The payload is then Base64Url encoded to form the second part of the JSON Web Token.

// To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

// HMACSHA256(
//   base64UrlEncode(header) + "." +
//   base64UrlEncode(payload),
//   secret)