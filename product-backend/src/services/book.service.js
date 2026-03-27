import Book from '../models/book.model';

//get all books
export const getAllBooks = async (query) => {
  const data = await Book.find();
  return data;
};

//get single book
export const getBook = async (id) => {
  const data = await Book.findById(id);
  return data;
};

//add review to book
export const addReview = async (body, bookID) => {
  const book = await getBook(bookID);
  if(book){
    await Book.updateOne(
      {_id: bookID},
      {$pull: {
        reviews: {userID: body.userID}
      }}
    );
    await Book.updateOne(
      {_id: bookID},
      {$push: {
        "reviews": body
      }}
    );
    return {error: 0, message: "Review added for book"};
  } else {
    return new Error('Book is not found');
  }
}