import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync('../src/services/pb/listings.proto');

const proto:any = grpc.loadPackageDefinition(packageDefinition).listings;

const credentials:any = grpc.credentials.createInsecure();

const LISTINGS_SVC_URL = process.env.LISTINGS_SVC_URL
console.log('The LISTINGS_SVC_URL is:', LISTINGS_SVC_URL);

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.ListingService(LISTINGS_SVC_URL, credentials);
