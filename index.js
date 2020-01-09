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

/**
 * Implements the SayHello RPC method.
 */


function SayHello(call, callback) {
    callback(null, {message: 'Hello ' + call.request.name});
}


/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello.HelloService.service, {SayHello : SayHello});
  server.bind('localhost:15002', grpc.ServerCredentials.createInsecure());
  console.log('Server running at http://localhost:15002')
  server.start();
}

main();
