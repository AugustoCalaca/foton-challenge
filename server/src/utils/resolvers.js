const BookResolver = require('../resolvers/book-resolver')
const AuthResolver = require('../resolvers/auth-resolver')

module.exports = {
  Query: {
    getBook: (_, { id }) => BookResolver.getBook(id),
    getBooks: _ => BookResolver.getBooks(),
    searchBooks: (_, { search }) => BookResolver.searchBooks(search),
    currentUser: (_, args, context) => context.user
  },
  Mutation: {
    addBook: (_, args) => BookResolver.addBook(args),
    signup: (_, args, context) => AuthResolver.signup(args, context),
    login: (_, args, context) => AuthResolver.login(args, context)
  },
  Subscription: {
    bookAdded: {
      subscribe: _ => BookResolver.pubsub.asyncIterator([BookResolver.BOOK_ADDED])
    }
  }
};
