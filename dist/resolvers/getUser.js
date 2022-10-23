import UserClient from '../services/User/UserClient';
const client = UserClient();
export default (root, params) => {
    return new Promise((resolve, reject) => {
        // console.log(params.data)
        // console.log(params.data.user_id)
        // console.log(params.user_id)
        // client.GetUser(params.data, function(err: any, response: any) {
        client.GetUser({ "user_id": "51ff89ea-0f82-45b8-a4e8-c39c05bf7dcf" }, function (err, response) {
            if (err) {
                return reject(err);
            }
            resolve(response);
        });
    });
};
