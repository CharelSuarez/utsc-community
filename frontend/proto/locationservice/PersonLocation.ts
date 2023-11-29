// Original file: proto/location_service.proto

import type { Location as _locationservice_Location, Location__Output as _locationservice_Location__Output } from '../locationservice/Location';

export interface PersonLocation {
  'personId'?: (number);
  'location'?: (_locationservice_Location | null);
}

export interface PersonLocation__Output {
  'personId': (number);
  'location': (_locationservice_Location__Output | null);
}
