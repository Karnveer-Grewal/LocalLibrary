//used .lengtht to get total book count
function getTotalBooksCount(books) {
  return books.length;
}

//used .length to get total account count
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

..//used reduce method to accumulate borrowed book count
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

//Helper Function
//used map to reformat each new object created into array
function _formatObjectAsArray(object) {
  return Object.keys(object).map((key) => {
    return {
      name: key,
      count: object[key],
    };
  });
}

//HELPER FUNCTION TO SORT AND SLICE
function sortSlice(arr) {
  return arr.sort((a, b) => b.count - a.count).slice(0, 5);
}

//used for of loop to get most common genres and used helper functions to get end result
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
  const sorted = sortSlice(genresArray);
  return sorted;
}

//used reduce to restructure and then helper function to sort and slice
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
  const sorted = sortSlice(reduced);
  return sorted;
}

//used reduce to restructure and then helper function to sort and slice
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
  const sorted = sortSlice(reduced);
  return sorted;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
