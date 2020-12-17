const postsResolvers = require('./post');
const usersResolvers = require('./users');
const commentResolver = require('./comment');

module.exports = {
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolver.Mutation
    }
}