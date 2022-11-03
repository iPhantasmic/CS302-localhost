import BookingClient from '../services/booking/BookingClient';

const client = BookingClient();
export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    client.GetBookingById(params.data, function(err: any, response: any) {
      if (err) {
        return reject(err);
      }
      console.log(response)
      resolve(response);
    });
  });
};