import ReviewClient from '../services/review/ReviewClient';

const client = ReviewClient();
export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.GetReview(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      console.log(response)
      resolve(response);
    });
  });
};