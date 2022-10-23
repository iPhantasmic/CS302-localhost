import * as path from 'path';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync(path.resolve('./src/services/User/users.proto'));
// type UserServiceType = {
//     getUser: (params, () => ()) => any
// }
const proto = grpc.loadPackageDefinition(packageDefinition).users;
// const credentials:any = grpc.credentials.createSsl(
//   fs.readFileSync(__dirname + '/cert/ca.crt'),
//   fs.readFileSync(__dirname + '/cert/client.key'),
//   fs.readFileSync(__dirname + '/cert/client.crt')
// );
const credentials = grpc.credentials.createInsecure();
// const interceptorAuth:any = (options:any, nextCall:any) =>
//   new grpc.InterceptingCall(nextCall(options), {
//     start: function(metadata, listener, next) {
//       metadata.add('x-api-key', 'myapikey');
//       next(metadata, listener);
//     }
//   });
const options = {
//   'grpc.ssl_target_name_override': 'localhost',
//   interceptors: [interceptorAuth]
};
export default () => new proto.UserService('localhost:50051', credentials);
