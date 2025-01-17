import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { User } from '../types/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, getBatteryConfig } from '../theme/colors';

const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Maria Schmidt',
    lastName: 'Schmidt',
    age: 65,
    status: 'Zu Hause',
    batteryLevel: '80%',
    lastUpdate: '1h',
    isActive: true,
    address: {
      street: 'Musterstraße',
      houseNumber: '1',
      postalCode: '12345',
      city: 'Berlin',
    },
    imei: '123456789012345',
    code: 'ABC123',
    isWearing: true,
    hasNetworkConnection: true,
    location: {
      type: 'HOME',
      coordinates: {
        latitude: 52.520008,
        longitude: 13.404954,
      }
    },
  },
  {
    id: '2',
    name: 'Hans Weber',
    lastName: 'Weber',
    age: 72,
    status: 'Unterwegs',
    batteryLevel: '65%',
    lastUpdate: '30m',
    isActive: true,
    address: {
      street: 'Hauptstraße',
      houseNumber: '42',
      postalCode: '10115',
      city: 'Berlin',
    },
    imei: '987654321098765',
    code: 'DEF456',
    isWearing: true,
    hasNetworkConnection: true,
    location: {
      type: 'AWAY',
      coordinates: {
        latitude: 52.520008,
        longitude: 13.404954,
      }
    },
  },
  {
    id: '3',
    name: 'Moritz Müller',
    lastName: 'Müller',
    age: 68,
    status: 'Unterwegs',
    batteryLevel: '30%',
    lastUpdate: '2m',
    isActive: false,
    address: {
      street: 'Parkweg',
      houseNumber: '15',
      postalCode: '10117',
      city: 'Berlin',
    },
    imei: '456789012345678',
    code: 'GHI789',
    isWearing: false,
    hasNetworkConnection: false,
    location: {
      type: 'UNKNOWN',
      coordinates: {
        latitude: 52.520008,
        longitude: 13.404954,
      }
    },
  },
];

type RootStackParamList = {
  Home: undefined;
  UserDetail: { user: User };
  AddUser: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderUserCard = ({ item }: { item: User }) => {
    const batteryStatus = getBatteryConfig(parseInt(item.batteryLevel));
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('UserDetail', { user: item })}
      >
        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <View style={styles.statusContainer}>
              <View style={[styles.statusDot, { backgroundColor: item.isActive ? '#4CAF50' : '#FF9800' }]} />
              <Text style={styles.statusText}>
                {item.isActive ? 'Uhr aktiv und verbunden' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Status</Text>
            <Text style={styles.detailValue}>{item.status}</Text>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Akku</Text>
            <View style={styles.batteryContainer}>
              <MaterialIcons 
                name={batteryStatus.icon}
                size={16} 
                color={batteryStatus.color}
                style={styles.batteryIcon}
              />
              <Text style={[styles.detailValue, { color: batteryStatus.color }]}>
                {item.batteryLevel}
              </Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>Letztes Update</Text>
            <Text style={styles.detailValue}>{item.lastUpdate}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_USERS}
        renderItem={renderUserCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: colors.gray900,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  textContainer: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.gray900,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: colors.gray500,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 16,
  },
  detail: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: colors.gray500,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray700,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  batteryIcon: {
    marginRight: 4,
  },
});

export default HomeScreen; 