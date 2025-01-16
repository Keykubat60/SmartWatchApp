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

const MOCK_USERS = [
  {
    id: '1',
    name: 'Maria Schmidt',
    status: 'Zu Hause',
    batteryLevel: '80%',
    lastUpdate: '1h',
    isActive: true,
  },
  {
    id: '2',
    name: 'Hans Weber',
    status: 'Unterwegs',
    batteryLevel: '65%',
    lastUpdate: '30m',
    isActive: true,
  },
];

type RootStackParamList = {
  Home: undefined;
  UserDetail: { user: User };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const renderUserCard = ({ item }: { item: User }) => (
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
          <Text style={styles.detailValue}>{item.batteryLevel}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.detailLabel}>Letztes Update</Text>
          <Text style={styles.detailValue}>{item.lastUpdate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meine Überwachten</Text>
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
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
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
    color: '#666',
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
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HomeScreen; 