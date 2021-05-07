//used find method to match id with specific author
function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

//used find method to find book by id
function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

//used to filter methods to create 2 seperate arrays and get end result
function partitionBooksByBorrowedStatus(books) {
  const returned = books.filter((book) => book.borrows[0].returned);
  const notReturned = books.filter((book) => !book.borrows[0].returned);
  const result = [notReturned, returned];
  return result;
}

function getBorrowersForBook(book, accounts) {
  //used reduce to restructure information
  const accountsById = accounts.reduce((acc, account) => {
    acc[account.id] = account;
    return acc;
  }, {});
  //used map to match and restructure into correct format
  const result = book.borrows.map(({ id, returned }) => ({
    ...accountsById[id],
    returned,
  }));
  //used slice to only get 10 results
  const sliced = result.slice(0, 10);
  return sliced;
}
// const bookBorrows = book.borrows;
// console.log(bookBorrows);
// //filter accounts array for each id in bookBorrows array
// let filtered = accounts.filter((account) => account.id ===

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
