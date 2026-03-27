import Wishlist from '../models/wishlist.model';
import * as BookService from '../services/book.service';

//add book to wishlist
export const addBook = async (userID, bookId) => {
  const book = await BookService.getBook(bookId);
  if(!book){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "Book not found."};
	}
  let wishlist = await getWishlist(userID);
  if(!wishlist){
    wishlist = await Wishlist.create({
      userID: userID,
      books: [
        {
          productID: book._id,
          description: book.description,
          bookName: book.bookName,
          author: book.author,
          price: book.price
        }
      ]
    });
    return wishlist;
  }
  let wishlistHasBook = false;
  for (let bookIndex = 0; bookIndex < wishlist.books.length; bookIndex++) {
    if(wishlist.books[bookIndex].productID == book._id){
      wishlistHasBook = true;
      break;
    }
  }
  let newWishlist;
  if(!wishlistHasBook){
    newWishlist = Wishlist.updateOne(
      {
        _id: wishlist._id
      },
      {
        $push: {
          books: {
            productID: book._id,
            description: book.description,
            bookName: book.bookName,
            author: book.author,
            price: book.price
          }
        }
      }
    );
  }
  return newWishlist;
};

//remove book from wishlist
export const removeBook = async (userID, bookId) => {
  const book = await BookService.getBook(bookId);
  if(!book){
		return {error: 1, status: HttpStatus.NOT_FOUND, message: "Book not found."};
	}
  let wishlist = await getWishlist(userID);
  if(!wishlist){
    return {error: 0, status: HttpStatus.OK, message: "Book not found in wishlist."};
  }
  let wishlistHasBook = false;
  for (let bookIndex = 0; bookIndex < wishlist.books.length; bookIndex++) {
    if(wishlist.books[bookIndex].productID == book._id){
      wishlistHasBook = true;
      break;
    }
  }
  let newWishlist;
  if(wishlistHasBook){
    newWishlist = Wishlist.updateOne(
      {
        _id: wishlist._id
      },
      {
        $pull: {
          books: {
            productID: book.id
          }
        }
      }
    );
  }
  return newWishlist;
};

//get user wishlist
export const getWishlist = async (userID) => {
  const data = await Wishlist.findOne({userID: userID});
  return data;
};