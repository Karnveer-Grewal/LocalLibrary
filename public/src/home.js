function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let totalBorrowed = 0;
  for (let i = 0; i < books.length; i++) {
    const borrowed = books[i].borrows;
    const reduced = borrowed.reduce((acc, borrow) => {
      if (!borrow.returned) {
        return acc + 1;
      }
      return acc;
    }, 0);
    totalBorrowed += reduced;
  }
  return totalBorrowed;
}

function _formatObjectAsArray(object) {
  return Object.keys(object).map((key) => {
    return {
      name: key,
      count: object[key],
    };
  });
}

function sort(arr) {
  return arr.sort((a, b) => b.count - a.count);
}
function getMostCommonGenres(books) {
  const genreCount = {};
  for (let book of books) {
    if (genreCount[book.genre]) {
      genreCount[book.genre]++;
    } else {
      genreCount[book.genre] = 1;
    }
  }
  const genresArray = _formatObjectAsArray(genreCount);
  const sorted = sort(genresArray);
  const sliced = sorted.slice(0, 5);
  return sliced;
}

function getMostPopularBooks(books) {
  const reduced = books.reduce((acc, book) => {
    const bookName = book.title;
    const length = book.borrows.length;
    const newObj = {};
    newObj["name"] = bookName;
    newObj["count"] = length;
    acc.push(newObj);
    return acc;
  }, []);
  const sorted = sort(reduced);
  const sliced = sorted.slice(0, 5);
  return sliced;
}

function getMostPopularAuthors(books, authors) {
  const reduced = books.reduce((acc, book) => {
    const authorId = book.authorId;
    const length = book.borrows.length;
    const found = authors.find((author) => author.id === authorId);
    const firstName = found.name.first;
    const lastName = found.name.last;
    const fullName = `${firstName} ${lastName}`;
    const authorObj = {};
    authorObj["name"] = fullName;
    authorObj["count"] = length;
    acc.push(authorObj);
    return acc;
  }, []);
  const sorted = sort(reduced);
  const sliced = sorted.slice(0, 5);
  return sliced;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
