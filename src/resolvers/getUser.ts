import UserClient from '../services/User/UserClient';

const client = UserClient();

export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    console.log(params.data)
    console.log(params.data.user_id)
    console.log(params.user_id)
    // client.GetUser(params.data, function(err: any, response: any) {
    client.GetUser(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};