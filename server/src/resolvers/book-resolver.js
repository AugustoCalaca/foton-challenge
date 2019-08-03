const { PubSub } = require('apollo-server');
const Book = require('../models/book-model');
const Author = require('../models/author-model');

const BOOK_ADDED = 'BOOK_ADDED';
const pubsub = new PubSub();

const getBook = async (id) => {
  try {
    return await Book
      .findById(id)
      .populate('author');
  } catch(err) {
    throw new Error('Id not found');
  }
};

const getBooks = async _ => {
  return await Book
    .find()
    .populate('author')
    .sort({ updatedAt: -1 })
};

const searchBooks = async (search) => {
  const andSearch = search
    .split(' ')
    .map(str => '\"' + str + '\"')
    .join(' ');

  return await Book
    .find({ $text: { $search: andSearch } })
    .populate('author')
    .sort({ updatedAt: -1 });
};

const addBook = async ({ title, author }) => {
  try {
    const findAuthor = await Author.findOne({
      name: author.name,
      age: author.age
    });

    console.log(findAuthor);
    if(!!findAuthor) {
      // same author with same title means that the book is duplicated
      const findBook = await Book.findOne({ title });
      console.log('book');
      console.log(findBook);
      if(!!findBook) {
        throw new Error('Duplicated Book')
      }
      else {
        const data = await Book.create({ title, author: findAuthor });
        await pubsub.publish(BOOK_ADDED, { bookAdded: data })
        return data;
      }
    }
    else {
      const newAuthor = await Author.create(author)
      const data = await Book.create({ title, author: newAuthor });
      await pubsub.publish(BOOK_ADDED, { bookAdded: data })
      return data;
    }
  } catch(err) {
    console.log(err);
    console.log('error create book')
    return err;
  }
};

module.exports = {
  getBook,
  getBooks,
  searchBooks,
  addBook,
  pubsub,
  BOOK_ADDED
};
