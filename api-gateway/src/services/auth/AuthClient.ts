import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync('../src/services/pb/auth.proto');

const proto:any = grpc.loadPackageDefinition(packageDefinition).auth;

const credentials:any = grpc.credentials.createInsecure();

const AUTH_SVC_URL = process.env.AUTH_SVC_URL
console.log('The AUTH_SVC_URL is:', AUTH_SVC_URL);

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.AuthService(AUTH_SVC_URL, credentials);