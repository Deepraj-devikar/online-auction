import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';
import HttpStatus from 'http-status-codes';

//add book to cart
export const addBook = async (userID, bookId) => {
  const book = await BookService.getBook(bookId);
  if(!book){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "Book not found."};
	}
  if(book.quantity <= 0){
		return {error: 0, status: HttpStatus.OK, message: "Book out of stock."};
	}
  let cart = await Cart.findOne({userID: userID, isPurchased: false});
  if(!cart){
    cart = await Cart.create({
      userID: userID,
      books: [
        {
          productID: book._id,
          description: book.description,
          bookName: book.bookName,
          author: book.author,
          quantity: 1,
          price: book.price
        }
      ],
      cartTotal: book.price
    });
    return cart;
  }
  let cartHasBook = false;
  let bookIndex;
  for (bookIndex = 0; bookIndex < cart.books.length; bookIndex++) {
    if(cart.books[bookIndex].productID == book._id){
      cartHasBook = true;
      break;
    }
  }
  let newCart;
  if(cartHasBook){
    const incObject = {};
    incObject["books."+bookIndex+".quantity"] = 1;
    incObject["cartTotal"] = book.price;
    newCart = Cart.updateOne(
      {
        _id: cart._id
      },
      {
        $inc: incObject
      }
    );
  }else{
    newCart = Cart.updateOne(
      {
        _id: cart._id
      },
      {
        $push: {
          books: {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            quantity: 1,
            price: book.price
          }
        },
        $inc: {
          cartTotal: book.price
        }
      }
    );
  }
  return newCart;
};

//remove book from cart
export const removeBook = async (userID, bookId, isAllBooks = false) => {
  const book = await BookService.getBook(bookId);
  if(!book){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "Book not found."};
	}
  let cart = await Cart.findOne({userID: userID, isPurchased: false});
  if(!cart){
    return {error: 0, status: HttpStatus.OK, message: "Book not found in cart."};
  }
  let cartHasBook = false;
  let bookIndex;
  for (bookIndex = 0; bookIndex < cart.books.length; bookIndex++) {
    if(cart.books[bookIndex].productID == book._id){
      cartHasBook = true;
      break;
    }
  }
  let newCart;
  if(cartHasBook){
    if(cart.books[bookIndex].quantity == 0 || cart.books[bookIndex].quantity == 1 || isAllBooks) {
      newCart = Cart.updateOne(
        {
          _id: cart._id
        },
        {
          $pull: {
            books: {
              productID: book.id
            }
          },
          $inc: {
            cartTotal: -(book.price * cart.books[bookIndex].quantity)
          }
        }
      );
    } else {
      const decObject = {};
      decObject["books."+bookIndex+".quantity"] = -1;
      decObject["cartTotal"] = -book.price;
      newCart = Cart.updateOne(
        {
          _id: cart._id
        },
        {
          $inc: decObject
        }
      );    
    }
  }
  return newCart;
}

//get user cart
export const getCart = async (userID) => {
  const data = await Cart.findOne({userID: userID, isPurchased: false});
  return data;
};

//purchase
export const purchase = async (userID) => {
  let cart = await Cart.findOne({userID: userID, isPurchased: false});
  cart = Cart.updateOne(
    {
      _id: cart._id
    },
    {
      $set: {
        isPurchased: true
      }
    }
  );
  return cart;
}