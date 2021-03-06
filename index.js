var PROTO_PATH = './protos/helloWorld.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello = grpc.loadPackageDefinition(packageDefinition).hello;


function SayHello(call, callback) {
    callback(null, {reply: 'Hello ' + call.request.greeting});
}

function main() {
  var server = new grpc.Server();
  server.addService(hello.HelloService.service, {SayHello : SayHello});
  server.bind('localhost:15002', grpc.ServerCredentials.createInsecure());
  console.log('Server running at http://localhost:15002')
  server.start();
}

main();
