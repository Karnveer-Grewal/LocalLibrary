function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  const sorted = accounts.sort((a, b) => {
    return a.name.last.toLowerCase() > b.name.last.toLowerCase() ? 1 : -1;
  });
  return sorted;
}

function getTotalNumberOfBorrows(account, books) {
  const borrowed = books.reduce((acc, book) => {
    const filtered = book.borrows.filter((borrow) => borrow.id === account.id);

    acc = acc + filtered.length;

    return acc;
  }, 0);
  return borrowed;
}

function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
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
