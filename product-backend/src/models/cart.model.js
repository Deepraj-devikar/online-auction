import { Schema, model } from 'mongoose';

const cartSchema = new Schema(
  {
    userID: {
      type: String
    },
    books: [{
      productID: {
        type: String
      },
      description: {
        type: String
      },
      bookName: {
        type: String
      },
      bookImage: {
        type: String
      },
      author: {
        type: String
      },
      quantity: {
        type: Number,
        default: 1
      },
      price: {
        type: Number
      }
    }],
    cartTotal: {
      type: Number,
      default: 0
    },
    isPurchased: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

export default model('Cart', cartSchema);