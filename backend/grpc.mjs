import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './proto/location_service.proto';
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH, 
    {
        keepCase: true,
        longs: String, // ?
        enums: String,
        defaults: true,
        oneofs: true
    }
);
const locationService = grpc.loadPackageDefinition(packageDefinition).locationservice;

const locations = {};

// call: Duplex
function sendGetLocations(call) {
    call.on('data', function(location) { // location: Location
        locations[12345] = { personId: 12345, location: location };
        call.write({personLocation: Object.values(locations)});
    });

    call.on('end', function() {
        call.end();
    });
}

function getServer() {
    const server = new grpc.Server();
    server.addService(locationService.LocationService.service, {
      sendGetLocations: sendGetLocations
    });
    return server;
}

const routeServer = getServer();
routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    routeServer.start();
});