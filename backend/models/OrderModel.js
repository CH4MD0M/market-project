const mongoose = require("mongoose");
const User = require("./UserModel");

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    orderTotal: {
      type: Number,
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { path: { type: String, required: true } },
        quantity: { type: Number, required: true },
        count: { type: Number, required: true },
        isReviewed: { type: Boolean, required: true, default: false },
      },
    ],
    transactionResult: {
      status: { type: String },
      createTime: { type: String },
      amount: { type: Number },
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
Order.watch().on("change", (data) => {
  if (data.operationType === "insert") {
    io.emit("newOrder", data.fullDocument);
  }
});
module.exports = Order;
