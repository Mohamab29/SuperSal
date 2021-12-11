const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, "user ID required"],
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "cart ID required"],
    },
    finalPrice: {
        type: Number,
        required: [true, "final price required"],
        min: [0, "final price can't be negative"],
        max: [11000, "final price can't exceed 11k"],
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
    deliveryDate: {
        type: Date,
        min: [new Date(Date.now()).getDate() + 1,"Date should be at least one day after the current date"],
        required: [true, "Shipping Date required"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creditCard: {
        type: String,
        minLength: [7, "Credit Card Number at least 7 digits"],
        maxLength: [16, "Credit Card Number at most 16 digits"],
        required: [true, "4 digits of credit card number required"]

    }


}, { versionKey: false, toJSON: { virtuals: true }, id: false });

OrderSchema.virtual("cart", {
    ref: "CartModel",
    localField: "cartId",
    foreignField: "_id",
    justOne: true
});

const OrderModel = mongoose.model("OrderModel",OrderSchema,"orders");

module.exports = OrderModel;

