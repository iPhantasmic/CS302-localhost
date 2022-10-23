import UserClient from '../services/User/UserClient';
const client = UserClient();
export default (root, params) => {
    return new Promise((resolve, reject) => {
        console.log(params.data);
        // client.GetUser(params.data, function(err: any, response: any) {
        client.GetUser(params.data, function (err, response) {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    });
};
