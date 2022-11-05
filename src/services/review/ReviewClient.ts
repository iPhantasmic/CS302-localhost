import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync('../src/services/pb/reviews.proto');

const proto:any = grpc.loadPackageDefinition(packageDefinition).reviews;

const credentials:any = grpc.credentials.createInsecure();

const REVIEWS_SVC_URL = process.env.REVIEWS_SVC_URL
console.log('The REVIEWS_SVC_URL is:', REVIEWS_SVC_URL);

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.ReviewService(REVIEWS_SVC_URL, credentials);
