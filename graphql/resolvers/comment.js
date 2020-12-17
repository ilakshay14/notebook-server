const Post = require('../../models/Post');
const checkAuth = require('../../util/checkAuth');
const { AuthenticationError, UserInputError } = require('apollo-server'); 

module.exports = {
    Mutation: {
        createComment: async (_, { postId, body }, context) => {
            const { username } = checkAuth(context);

            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'comment body must not be empty'
                    }
                })
            }

            const post = await Post.findById(postId);
            if(post){
                post.comments.unshift({
                    body,
                    username,
                    createdAt: new Date().toISOString()

                })
                await (await post).save();
                return post;
            } else throw new UserInputError('Post not found');
        },

        deleteComment: async (_, { postId, commentId }, context) => {
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                //console.log(post);
                let commentIndex = post.comments.findIndex(comment => comment.id === commentId);
                if(post.comments[commentIndex].username === username){
                    post.comments.splice(commentIndex, 1);
                    await post.save();
                    return post;
                } else throw new AuthenticationError('You can only delete your comment');
            }
            throw new Error('Post new found');
        }
    }
}