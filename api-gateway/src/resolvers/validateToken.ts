import AuthClient from '../services/auth/AuthClient';

const client = AuthClient();

export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.Validate(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      resolve(response);
    });
  });
};