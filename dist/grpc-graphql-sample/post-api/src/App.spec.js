/* eslint-env jest */
import App from './App';
import Client from './tools/Client';
const API_KEY = 'myapikey';
const PORT = 50052;
let app;
let secureClient;
describe('Sample gRPC Post API', () => {
    beforeAll(async () => {
        app = new App('mongodb://localhost:27017/sample-grpc-test', PORT);
        await app.start();
        secureClient = Client.getSecureClient('localhost:${PORT}', API_KEY);
    });
    afterAll(async () => {
        await app.stop();
    });
    describe('App', () => {
        test.only('Insecure call should fail', (done) => {
            let insecureClient = Client.getInsecureClient(`localhost:${PORT}`);
            insecureClient.addPost({ title: 'sample title', body: 'sample body' }, function (err, response) {
                console.log(err);
                expect(err.toString()).toBe('[Error: 14 UNAVAILABLE: Connect Failed]');
                expect(response).toBe(undefined);
                done();
            });
        });
        test('Secure call should be OK', (done) => {
            secureClient.addPost({ title: 'sample title', body: 'sample body' }, function (err, response) {
                expect(err.toString()).toBe(undefined);
                expect(response).toBe(undefined);
                done();
            });
        });
    });
});
