import SNSPublisher from '../services/email/booking_confirmed';

const email_publisher = new SNSPublisher();

export default (root:any, params: any) => {
  return new Promise((resolve: any, reject: any) => {
    try{
        const response = email_publisher.publish_message_booking_confirmed(params)
        resolve(response);
    }
    catch(err: any){
        return reject(err)
    }
  });
};