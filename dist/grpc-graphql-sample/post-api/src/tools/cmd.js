import * as grpc from '@grpc/grpc-js';
import PostClient from './PostClient';
import HealthClient from './HealthClient';
function main() {
    const API_KEY = 'myapikey';
    const endpoint = 'localhost:50051';
    let secureHealthClient = HealthClient.getSecureClient(endpoint);
    secureHealthClient.Check({}, (err, response) => {
        console.log('Check', err, response);
    });
    let securePostClientWithApiKey = PostClient.getSecureClient(endpoint, API_KEY);
    securePostClientWithApiKey.listPosts({ page: 1 }, (err, response) => {
        console.log('Post list', err, response);
    });
    // PASSING APIKEY AT THE CALL LEVEL
    let secureClient = PostClient.getSecureClient(endpoint);
    const metadata = new grpc.Metadata();
    metadata.add('x-api-key', API_KEY);
    secureClient.listPosts({ page: 1 }, metadata, (err, response) => {
        console.log('Post list', err, response);
    });
    secureClient.listPosts({ page: 1 }, (err, response) => {
        console.log('Post list with Error', err, response);
    });
}
main();
