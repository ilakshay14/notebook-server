const postsResolvers = require('./post');
const usersResolvers = require('./users');
const commentResolver = require('./comment');

module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolver.Mutation
    },
    Subscription: {
        ...postsResolvers.Subscription
    }
}