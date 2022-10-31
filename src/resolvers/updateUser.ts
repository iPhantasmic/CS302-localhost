import UserClient from '../services/user/UserClient';

const client = UserClient();

export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.UpdateUser(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};