export interface User {
  id: string;
  name: string;
  status: string;
  batteryLevel: string;
  lastUpdate: string;
  isActive: boolean;
  lastName: string;
  age: number;
  address: {
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
  };
  imei: string;
  code: string;
  profileImage?: string;
  isWearing: boolean;
  hasNetworkConnection: boolean;
  location: {
    type: 'HOME' | 'AWAY' | 'UNKNOWN';
    address?: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
} 