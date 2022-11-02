import fs from 'fs';
import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync(path.resolve('./src/services/pb/reviews.proto'));

const proto:any = grpc.loadPackageDefinition(packageDefinition).reviews;



const credentials:any = grpc.credentials.createInsecure();

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.ReviewService('localhost:50052', credentials);