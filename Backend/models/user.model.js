const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    _id: {
        type: String,
        trim: true,
        maxlength: [9, "Id must be exactly 9 characters long"],
        minlength: [9, "Id must be exactly 9 characters long"],
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "missing first name"],
        minlength: [2, "Name must be minimum two chars."],
        maxlength: [20, "Name can't exceed 20 chars."]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "missing last name"],
        minlength: [2, "Name must be minimum two chars."],
        maxlength: [30, "Name can't exceed 30 chars."]
    },
    username: {
        type: String,
        trim: true,
        unique: [true, "username must be unique"],
        required: [true, "missing username/email"],
        match: [/^([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+$/, "Email must be legal"],
    },
    password: {
        type: String,
        required: true,
        match: [/(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}/, "A password should be at least 8 characters long, contain at least 1 special,1 lowercase,1 uppercase character and at least one 1 number."]
    },
    city: {
        type: String,
        trim: true,
        required: [true, "missing city"],
        minlength: [2, "Name must be minimum two chars."],
        maxlength: [40, "Name can't exceed 40 chars."]
    },
    street: {
        type: String,
        trim: true,
        required: [true, "missing street name"],
        minlength: [2, "Name must be minimum two chars."],
        maxlength: [50, "Name can't exceed 50 chars."]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    versionKey: false, // Don't add a "__v" field to added documents.
});
const UserModel = mongoose.model("UserModel", UserSchema, "users");

UserSchema.pre("save", (next, done) => {
    let self = this;
    mongoose.models["UserModel"].findOne({ email: self.email }, (err, results) => {
        if (err) {
            done(err);
        } else if (results) { //there was a result found, so the email address exists
            self.invalidate("username", "username must be unique");
            done(new Error("username must be unique"));
        } else {
            done();
        }
    });
    next();
});


module.exports = UserModel;