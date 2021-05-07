//Used find method to match with id provided
function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

//Sorted by Last Name
function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort((a, b) => {
    return a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1;
  });
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  //used reduce to create an acc
  const borrowed = books.reduce((acc, book) => {
    //filter for specific account id
    const filtered = book.borrows.filter((borrow) => borrow.id === account.id);

    acc = acc + filtered.length;

    return acc;
  }, 0);
  return borrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  //used filtered method to match account id and book not returned
  let filtered = books.filter((book) => {
    let borrowedBooks = book.borrows;
    let found = borrowedBooks.find(
      (borrow) => borrow.id === account.id && borrow.returned === false
    );
    if (found) {
      return true;
    } else {
      return false;
    }
  });
  //used map to restructure for end result
  let result = filtered.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
