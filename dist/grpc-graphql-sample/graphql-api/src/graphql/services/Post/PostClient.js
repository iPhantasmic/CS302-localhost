import fs from 'fs';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync(__dirname + '/post.proto');
const proto = grpc.loadPackageDefinition(packageDefinition).sample;
const credentials = grpc.credentials.createSsl(fs.readFileSync(__dirname + '/cert/ca.crt'), fs.readFileSync(__dirname + '/cert/client.key'), fs.readFileSync(__dirname + '/cert/client.crt'));
const interceptorAuth = (options, nextCall) => new grpc.InterceptingCall(nextCall(options), {
    start: function (metadata, listener, next) {
        metadata.add('x-api-key', 'myapikey');
        next(metadata, listener);
    }
});
const options = {
    'grpc.ssl_target_name_override': 'localhost',
    interceptors: [interceptorAuth]
};
export default () => new proto.PostService('localhost:50051', credentials, options);
