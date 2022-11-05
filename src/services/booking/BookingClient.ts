import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync('../src/services/pb/bookings.proto');

const proto:any = grpc.loadPackageDefinition(packageDefinition).bookings;

const credentials:any = grpc.credentials.createInsecure();

const BOOKINGS_SVC_URL = process.env.BOOKINGS_SVC_URL
console.log('The BOOKINGS_SVC_URL is:', BOOKINGS_SVC_URL);

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.BookingService(BOOKINGS_SVC_URL, credentials);