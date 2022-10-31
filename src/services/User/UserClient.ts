import fs from 'fs';
import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

const packageDefinition:any = protoLoader.loadSync("../src/services/pb/users.proto");

// type UserServiceType = {
//     getUser: (params, () => ()) => any
// }

const proto:any = grpc.loadPackageDefinition(packageDefinition).users;

// const credentials:any = grpc.credentials.createSsl(
//   fs.readFileSync(__dirname + '/cert/ca.crt'),
//   fs.readFileSync(__dirname + '/cert/client.key'),
//   fs.readFileSync(__dirname + '/cert/client.crt')
// );

const credentials:any = grpc.credentials.createInsecure();

// const interceptorAuth:any = (options:any, nextCall:any) =>
//   new grpc.InterceptingCall(nextCall(options), {
//     start: function(metadata, listener, next) {
//       metadata.add('x-api-key', 'myapikey');
//       next(metadata, listener);
//     }
//   });

const AUTH_SVC_URL = process.env.AUTH_SVC_URL
console.log('The AUTH_SVC_URL is:', AUTH_SVC_URL);

const options:any = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};

export default () => new proto.UserService(AUTH_SVC_URL, credentials);
