const { gql } = require('apollo-server');

module.exports = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
        comments: [Comments]!
        likes: [Likes]!
        likeCount: Int!
        commentCount: Int!
    }

    type Likes{
        id: ID!
        createdAt: String!
        username: String!
    }

    type Comments{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }

    type User{
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput{
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    type Query{
        getPosts: [Post]
        # TODO:Get post with ID
        getPost(postId: ID!): Post
        # TODO:Get post of a user by username
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
        #TODO:Add the funcationality to follow/unfollow user
    }

    type Subscription{
        newPost: Post!
    }
`;