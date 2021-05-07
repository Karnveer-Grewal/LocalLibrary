function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const returned = books.filter((book) => book.borrows[0].returned);
  const notReturned = books.filter((book) => !book.borrows[0].returned);
  const result = [notReturned, returned];
  return result;
}

function getBorrowersForBook(book, accounts) {
  const accountsById = accounts.reduce((acc, account) => {
    acc[account.id] = account;
    return acc;
  }, {});
  const result = book.borrows.map(({ id, returned }) => ({
    ...accountsById[id],
    returned,
  }));
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
