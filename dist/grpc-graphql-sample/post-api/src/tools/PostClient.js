import fs from 'fs';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
const packageDefinition = protoLoader.loadSync(__dirname + '/../services/Post/Post.proto');
const proto = grpc.loadPackageDefinition(packageDefinition);
class PostClient {
    static getInsecureClient(host) {
        return new proto.sample.PostService(host, grpc.credentials.createInsecure());
    }
    static getSecureClient(host, apiKey) {
        let credentials = grpc.credentials.createSsl(fs.readFileSync(__dirname + '/../cert/ca.crt'), fs.readFileSync(__dirname + '/../cert/client.key'), fs.readFileSync(__dirname + '/../cert/client.crt'));
        if (!apiKey) {
            return new proto.sample.PostService(host, credentials);
        }
        const interceptorAuth = (options, nextCall) => new grpc.InterceptingCall(nextCall(options), {
            start: function (metadata, listener, next) {
                metadata.add('x-api-key', apiKey);
                next(metadata, listener);
            }
        });
        const options = {
            'grpc.ssl_target_name_override': 'localhost',
            interceptors: [interceptorAuth]
        };
        return new proto.sample.PostService(host, credentials, options);
    }
}
export default PostClient;
