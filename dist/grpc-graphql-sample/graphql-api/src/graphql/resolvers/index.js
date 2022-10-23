import addPost from './addPost';
import listPosts from './listPosts';
const resolvers = {
    Mutation: {
        addPost
    },
    Query: {
        listPosts
    },
};
export default resolvers;
