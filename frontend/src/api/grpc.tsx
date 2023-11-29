'use client';
import grpc from '@grpc/grpc-js';
import { ProtoGrpcType } from '../../proto/location_service';
import { LocationServiceClient } from '../../proto/locationservice/LocationService';
import { Location } from '../../proto/locationservice/Location';
import { LocationResponse } from '../../proto/locationservice/LocationResponse';
import { PersonLocation } from '../../proto/locationservice/PersonLocation';

const ROUND_FACTOR = 1e7;

export function connectToServer() {
    const client = new LocationServiceClient('localhost:50051', grpc.credentials.createInsecure());
    var call = client.sendGetLocations();
    // call.on('data', function(locationResponse: LocationResponse) {
    //     console.log();
    // });
    // call.on('end', callback);

    call.write({
        latitude: 43.78393739345549 * ROUND_FACTOR, 
        longitude: -79.18573731545196 * ROUND_FACTOR
    });
}

function sendLocation() {

}

