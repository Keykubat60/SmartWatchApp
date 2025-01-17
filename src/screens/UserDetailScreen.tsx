import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { LineChart } from 'react-native-chart-kit';
import { User } from '../types/index';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors, getBatteryConfig } from '../theme/colors';
import * as ImagePicker from 'react-native-image-picker';

interface UserDetailScreenProps {
  route: {
    params: {
      user: User;
    };
  };
  navigation: any;
}

const MOCK_HEALTH_DATA = {
  labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
  heartRate: [75, 72, 78, 82, 76],
  steps: [0, 1200, 4500, 8900, 10200],
};

const UserDetailScreen = ({ route, navigation }: UserDetailScreenProps) => {
  const { user } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const batteryStatus = getBatteryConfig(parseInt(user.batteryLevel));

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    }, (response: any) => {
      if (response?.assets?.[0]?.uri) {
        setEditedUser(prev => ({
          ...prev,
          profileImage: response.assets[0].uri
        }));
      }
    });
  };

  const handleSave = () => {
    // Hier würde normalerweise der API-Call kommen
    Alert.alert(
      'Erfolg',
      'Änderungen wurden gespeichert',
      [{ text: 'OK', onPress: () => setIsEditing(false) }]
    );
  };

  const renderEditMode = () => (
    <ScrollView style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={handleImagePick} style={styles.imagePickerContainer}>
          <Image
            source={editedUser.profileImage ? { uri: editedUser.profileImage } : require('../assets/avatar.png')}
            style={styles.profileImage}
          />
          <View style={styles.imagePickerOverlay}>
            <MaterialIcons name="camera-alt" size={24} color={colors.white} />
          </View>
        </TouchableOpacity>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Vorname</Text>
          <TextInput
            style={styles.input}
            value={editedUser.name}
            onChangeText={(text) => setEditedUser(prev => ({ ...prev, name: text }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nachname</Text>
          <TextInput
            style={styles.input}
            value={editedUser.lastName}
            onChangeText={(text) => setEditedUser(prev => ({ ...prev, lastName: text }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Straße</Text>
          <TextInput
            style={styles.input}
            value={editedUser.address.street}
            onChangeText={(text) => setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, street: text }
            }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Hausnummer</Text>
          <TextInput
            style={styles.input}
            value={editedUser.address.houseNumber}
            onChangeText={(text) => setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, houseNumber: text }
            }))}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>PLZ</Text>
          <TextInput
            style={styles.input}
            value={editedUser.address.postalCode}
            onChangeText={(text) => setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, postalCode: text }
            }))}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Stadt</Text>
          <TextInput
            style={styles.input}
            value={editedUser.address.city}
            onChangeText={(text) => setEditedUser(prev => ({
              ...prev,
              address: { ...prev.address, city: text }
            }))}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Speichern</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const handleCall = () => {
    // Implementieren Sie hier die Anruffunktion
    console.log('Anruf starten...');
  };
  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => setIsEditing(!isEditing)}
          style={styles.editButton}
        >
          <MaterialIcons 
            name={isEditing ? "close" : "edit"} 
            size={24} 
            color={colors.primary}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, isEditing]);

  return isEditing ? renderEditMode() : (
    <View style={styles.container}>
      {/* Profilbereich */}
      <View style={styles.profileContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require('../assets/avatar.png')}
              style={styles.profileImage}
              defaultSource={require('../assets/avatar.png')}
            />
            <View style={[styles.statusDot, { backgroundColor: user.isActive ? '#4CAF50' : '#FF9800' }]} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userStatus}>{user.status}</Text>
            <View style={styles.batteryContainer}>
              <MaterialIcons 
                name={batteryStatus.icon} 
                size={20} 
                color={batteryStatus.color}
              />
              <Text style={[styles.batteryText, { color: batteryStatus.color }]}>
                {user.batteryLevel}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <MaterialIcons name="phone" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Karte */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.520008,
          longitude: 13.404954,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: 52.520008,
            longitude: 13.404954,
          }}
          title={user.name}
          description={user.status}
        />
      </MapView>

      {/* Bottom Sheet mit Gesundheitsdaten */}
      <BottomSheet
        snapPoints={['5%', '80%']}
        index={0}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.chartTitle}>Herzfrequenz (24h)</Text>
          <LineChart
            data={{
              labels: MOCK_HEALTH_DATA.labels,
              datasets: [{
                data: MOCK_HEALTH_DATA.heartRate
              }]
            }}
            width={Dimensions.get('window').width - 32}
            height={180}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(98, 0, 238, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />

          <Text style={styles.chartTitle}>Schritte (24h)</Text>
          <LineChart
            data={{
              labels: MOCK_HEALTH_DATA.labels,
              datasets: [{
                data: MOCK_HEALTH_DATA.steps
              }]
            }}
            width={Dimensions.get('window').width - 32}
            height={180}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            }}
            bezier
            style={styles.chart}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 16,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.gray900,
  },
  userStatus: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 4,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    marginLeft: 4,
    color: '#4CAF50',
  },
  callButton: {
    backgroundColor: colors.primary,
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  map: {
    flex: 1,
  },
  bottomSheetContent: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.gray900,
  },
  chart: {
    marginBottom: 24,
    borderRadius: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: colors.gray700,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.gray900,
  },
  imagePickerContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePickerOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  saveButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    padding: 8,
    marginRight: 8,
  },
});

export default UserDetailScreen; 