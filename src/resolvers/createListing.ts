import ListingClient from '../services/listing/ListingClient';

const client = ListingClient();
export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.CreateListing(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      console.log(response)
      resolve(response);
    });
  });
};