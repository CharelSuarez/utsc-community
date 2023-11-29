// Original file: proto/location_service.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Location as _locationservice_Location, Location__Output as _locationservice_Location__Output } from '../locationservice/Location';
import type { LocationResponse as _locationservice_LocationResponse, LocationResponse__Output as _locationservice_LocationResponse__Output } from '../locationservice/LocationResponse';

export interface LocationServiceClient extends grpc.Client {
  SendGetLocations(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_locationservice_Location, _locationservice_LocationResponse__Output>;
  SendGetLocations(options?: grpc.CallOptions): grpc.ClientDuplexStream<_locationservice_Location, _locationservice_LocationResponse__Output>;
  sendGetLocations(metadata: grpc.Metadata, options?: grpc.CallOptions): grpc.ClientDuplexStream<_locationservice_Location, _locationservice_LocationResponse__Output>;
  sendGetLocations(options?: grpc.CallOptions): grpc.ClientDuplexStream<_locationservice_Location, _locationservice_LocationResponse__Output>;
  
}

export interface LocationServiceHandlers extends grpc.UntypedServiceImplementation {
  SendGetLocations: grpc.handleBidiStreamingCall<_locationservice_Location__Output, _locationservice_LocationResponse>;
  
}

export interface LocationServiceDefinition extends grpc.ServiceDefinition {
  SendGetLocations: MethodDefinition<_locationservice_Location, _locationservice_LocationResponse, _locationservice_Location__Output, _locationservice_LocationResponse__Output>
}
