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

function main() {
  var client = new hello.HelloService('localhost:9080', grpc.credentials.createInsecure());
  client.SayHello({greeting: "huu 1"}, function(err, response) {
    console.log('response', response)
  });
}

main();