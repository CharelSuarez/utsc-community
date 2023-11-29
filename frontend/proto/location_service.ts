import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { LocationServiceClient as _locationservice_LocationServiceClient, LocationServiceDefinition as _locationservice_LocationServiceDefinition } from './locationservice/LocationService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  locationservice: {
    Location: MessageTypeDefinition
    LocationResponse: MessageTypeDefinition
    LocationService: SubtypeConstructor<typeof grpc.Client, _locationservice_LocationServiceClient> & { service: _locationservice_LocationServiceDefinition }
    PersonLocation: MessageTypeDefinition
  }
}

