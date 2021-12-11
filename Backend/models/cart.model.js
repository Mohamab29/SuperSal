const mongoose = require("mongoose");


const CartSchema = mongoose.Schema({
    userId: {
        required: [true, "missing user id"],
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now().toString(),
    },
    status: {
        type: String,
        enum: ["CLOSED", "OPEN", "EMPTY"],
        required: true,
        default:"EMPTY",
    }
}, { versionKey: false, toJSON: { virtuals: true }, id: false });

CartSchema.virtual("user", {
    ref: "UserModel",
    localField: "userId",
    foreignField: "_id",
    justOne: true
});

const CartModel = mongoose.model("CartModel", CartSchema, "carts");

module.exports = CartModel;