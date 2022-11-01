import fs from 'fs';
import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync(path.resolve('./src/services/pb/bookings.proto'));

const proto:any = grpc.loadPackageDefinition(packageDefinition).bookings;



const credentials:any = grpc.credentials.createInsecure();

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.BookingService('localhost:50051', credentials);