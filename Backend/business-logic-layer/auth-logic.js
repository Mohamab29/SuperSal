const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');

const hashPassword = (password) => bcrypt.hashSync(password, 10);

function getAllUsersAsync() {
    return UserModel.find().exec();
}
function getOneUserAsync(_id) {
    return UserModel.findById(_id).exec();
}
// login
async function checkCredentialsAsync(credentials) {
    const { username, password } = credentials;

    const user = await UserModel.find({ username }).exec();
    if(!user[0]) return "Incorrect username";
    const hashedPassword = bcrypt.compareSync(password,user[0].password);
    if(!hashedPassword) return "Incorrect password";

    delete user[0]._doc.password;

    return user[0];
}
// register
async function addUserAsync(user) {
    // hash:
    user.password = hashPassword(user.password);
    const addedUser = await user.save();
    // Success:
    delete addedUser._doc.password; //deleting password from user object
    return addedUser;
}


module.exports = {
    getAllUsersAsync,
    getOneUserAsync,
    checkCredentialsAsync,
    addUserAsync
}
