import PostClient from '../services/Post/PostClient';
const client = PostClient();
export default (root, params) => {
    return new Promise((resolve, reject) => {
        client.listPosts(params, function (err, response) {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    });
};
