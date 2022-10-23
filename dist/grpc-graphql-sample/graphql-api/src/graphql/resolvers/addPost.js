import PostClient from '../services/Post/PostClient';
const client = PostClient();
export default (root, params) => {
    return new Promise((resolve, reject) => {
        client.addPost(params.data, function (err, response) {
            if (err) {
                return reject(err.details);
            }
            resolve({ message: "post.created", result: response });
        });
    });
};
