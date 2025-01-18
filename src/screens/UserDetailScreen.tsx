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
  Modal,
  SafeAreaView,
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

interface Notification {
  id: string;
  type: 'SOS' | 'FALL' | 'BATTERY' | 'OFFLINE' | 'OTHER';
  message: string;
  timestamp: string;
  isRead: boolean;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  emergencyCall?: {
    number: string;
    timestamp: string;
    status: 'completed' | 'failed' | 'ongoing';
  };
}

interface ExtendedUserStatus {
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

const MOCK_HEALTH_DATA = {
  labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
  heartRate: [75, 72, 78, 82, 76],
  steps: [0, 1200, 4500, 8900, 10200],
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'SOS',
    message: 'SOS-Alarm wurde ausgelöst',
    timestamp: '2024-03-20T10:30:00',
    isRead: false,
    location: {
      latitude: 52.520008,
      longitude: 13.404954,
      address: 'Alexanderplatz, 10178 Berlin',
    },
    emergencyCall: {
      number: '+49 123 456789',
      timestamp: '2024-03-20T10:30:05',
      status: 'completed',
    },
  },
  {
    id: '2',
    type: 'FALL',
    message: 'Sturz erkannt',
    timestamp: '2024-03-20T09:15:00',
    isRead: false,
    location: {
      latitude: 52.523420,
      longitude: 13.411440,
      address: 'Museumsinsel, 10178 Berlin',
    },
  },
];

const UserDetailScreen = ({ route, navigation }: UserDetailScreenProps) => {
  const { user } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const batteryStatus = getBatteryConfig(parseInt(user.batteryLevel));
  const [showMap, setShowMap] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showNotificationDetails, setShowNotificationDetails] = useState(false);

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

  const handleHealthSummary = () => {
    Alert.alert(
      'KI-Gesundheitszusammenfassung',
      'Zusammenfassung der letzten 24 Stunden:\n\n' +
      '• Durchschnittliche Herzfrequenz: 76 bpm - im normalen Bereich\n' +
      '• Schrittanzahl: 10.200 - Bewegungsziel erreicht\n' +
      '• Schlafqualität: 7.2h - gute Schlafphase\n' +
      '• Aktivitätsmuster: Regelmäßige Bewegung am Vormittag\n' +
      '• Empfehlung: Mehr Bewegung am Nachmittag einplanen',
      [{ text: 'OK' }]
    );
  };

  const handleNotificationPress = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowNotificationDetails(true);
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

  const renderNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'SOS':
        return <MaterialIcons name="warning" size={24} color={colors.error} />;
      case 'FALL':
        return <MaterialIcons name="person-outline" size={24} color={colors.warning} />;
      case 'BATTERY':
        return <MaterialIcons name="battery-alert" size={24} color={colors.warning} />;
      case 'OFFLINE':
        return <MaterialIcons name="wifi-off" size={24} color={colors.error} />;
      default:
        return <MaterialIcons name="notifications" size={24} color={colors.gray500} />;
    }
  };

  const renderNotificationDetails = () => {
    if (!selectedNotification) return null;

    return (
      <Modal
        visible={showNotificationDetails}
        animationType="slide"
        onRequestClose={() => setShowNotificationDetails(false)}
      >
        <SafeAreaView style={styles.notificationDetailContainer}>
          <View style={styles.notificationDetailHeader}>
            <TouchableOpacity 
              onPress={() => setShowNotificationDetails(false)}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" size={24} color={colors.gray900} />
            </TouchableOpacity>
            <Text style={styles.notificationDetailTitle}>
              Benachrichtigungsdetails
            </Text>
          </View>
          <ScrollView style={styles.notificationDetailContent}>
            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Typ</Text>
              <View style={styles.detailRow}>
                {renderNotificationIcon(selectedNotification.type)}
                <Text style={styles.detailValue}>{selectedNotification.message}</Text>
              </View>
            </View>

            <View style={styles.detailSection}>
              <Text style={styles.detailLabel}>Zeit</Text>
              <Text style={styles.detailValue}>
                {new Date(selectedNotification.timestamp).toLocaleString()}
              </Text>
            </View>

            {selectedNotification.type === 'SOS' && selectedNotification.emergencyCall && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Notruf</Text>
                <View style={styles.emergencyCallInfo}>
                  <MaterialIcons name="phone" size={20} color={colors.primary} />
                  <Text style={styles.detailValue}>{selectedNotification.emergencyCall.number}</Text>
                  <Text style={[styles.callStatus, { 
                    color: selectedNotification.emergencyCall.status === 'completed' 
                      ? colors.success 
                      : colors.error 
                  }]}>
                    {selectedNotification.emergencyCall.status === 'completed' ? 'Verbunden' : 'Fehlgeschlagen'}
                  </Text>
                </View>
              </View>
            )}

            {selectedNotification.location && (
              <View style={styles.detailSection}>
                <Text style={styles.detailLabel}>Standort</Text>
                <Text style={styles.detailValue}>{selectedNotification.location.address}</Text>
                <View style={styles.notificationMap}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: selectedNotification.location.latitude,
                      longitude: selectedNotification.location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.01,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude: selectedNotification.location.latitude,
                        longitude: selectedNotification.location.longitude,
                      }}
                      title={selectedNotification.message}
                    />
                  </MapView>
                </View>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    );
  };

  const renderNotificationItem = (notification: Notification) => (
    <TouchableOpacity 
      key={notification.id} 
      style={styles.notificationItem}
      onPress={() => handleNotificationPress(notification)}
    >
      {renderNotificationIcon(notification.type)}
      <View style={styles.notificationContent}>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
        <Text style={styles.notificationTime}>
          {new Date(notification.timestamp).toLocaleTimeString()}
        </Text>
        {notification.location && (
          <Text style={styles.notificationLocation}>
            {notification.location.address}
          </Text>
        )}
      </View>
      <MaterialIcons name="chevron-right" size={24} color={colors.gray400} />
    </TouchableOpacity>
  );

  const renderStatusSection = () => (
    <View style={styles.statusSection}>
      {/* Benachrichtigungen */}
      {MOCK_NOTIFICATIONS.length > 0 && (
        <View style={styles.notificationsContainer}>
          <Text style={styles.sectionTitle}>Aktuelle Benachrichtigungen</Text>
          {MOCK_NOTIFICATIONS.map((notification) => renderNotificationItem(notification))}
        </View>
      )}

      {/* Gerätestatus */}
      <View style={styles.deviceStatusContainer}>
        <Text style={styles.sectionTitle}>Gerätestatus</Text>
        <View style={styles.statusGrid}>
          {/* Batterie */}
          <View style={styles.statusItem}>
            <MaterialIcons 
              name={batteryStatus.icon} 
              size={24} 
              color={batteryStatus.color}
            />
            <Text style={styles.statusLabel}>Akku</Text>
            <Text style={[styles.statusValue, { color: batteryStatus.color }]}>
              {user.batteryLevel}
            </Text>
          </View>

          {/* Tragesstatus */}
          <View style={styles.statusItem}>
            <MaterialIcons 
              name="watch" 
              size={24} 
              color={user.isWearing ? colors.success : colors.error}
            />
            <Text style={styles.statusLabel}>Status</Text>
            <Text style={styles.statusValue}>
              {user.isWearing ? 'Wird getragen' : 'Nicht getragen'}
            </Text>
          </View>

          {/* Netzwerkstatus */}
          <View style={styles.statusItem}>
            <MaterialIcons 
              name={user.hasNetworkConnection ? "wifi" : "wifi-off"}
              size={24} 
              color={user.hasNetworkConnection ? colors.success : colors.error}
            />
            <Text style={styles.statusLabel}>Netzwerk</Text>
            <Text style={styles.statusValue}>
              {user.hasNetworkConnection ? 'Verbunden' : 'Offline'}
            </Text>
          </View>

          {/* Standort */}
          <TouchableOpacity 
            style={styles.statusItem}
            onPress={() => setShowMap(true)}
          >
            <MaterialIcons 
              name="location-on" 
              size={24} 
              color={colors.primary}
            />
            <Text style={styles.statusLabel}>Standort</Text>
            <Text style={styles.statusValue}>{user.status}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* KI-Zusammenfassung Button */}
      <TouchableOpacity 
        style={styles.summaryButton}
        onPress={handleHealthSummary}
      >
        <MaterialIcons 
          name="analytics" 
          size={24} 
          color={colors.white}
          style={styles.summaryIcon}
        />
        <Text style={styles.summaryButtonText}>
          KI-Zusammenfassung erstellen
        </Text>
      </TouchableOpacity>
    </View>
  );

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

      {/* Neue Status-Sektion */}
      <ScrollView style={styles.scrollContainer}>
        {renderStatusSection()}
      </ScrollView>

      {/* Karte als Modal */}
      <Modal
        visible={showMap}
        animationType="slide"
        onRequestClose={() => setShowMap(false)}
      >
        <View style={styles.mapContainer}>
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
          <TouchableOpacity 
            style={styles.closeMapButton}
            onPress={() => setShowMap(false)}
          >
            <MaterialIcons name="close" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </Modal>

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
      {renderNotificationDetails()}
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
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  statusSection: {
    padding: 16,
  },
  notificationsContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.gray900,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  notificationContent: {
    marginLeft: 12,
    flex: 1,
  },
  notificationMessage: {
    fontSize: 16,
    color: colors.gray900,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 14,
    color: colors.gray500,
  },
  deviceStatusContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    backgroundColor: colors.gray50,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 14,
    color: colors.gray500,
    marginTop: 8,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.gray900,
    marginTop: 4,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  closeMapButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 8,
    elevation: 4,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  summaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryIcon: {
    marginRight: 8,
  },
  summaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationDetailContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notificationDetailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    height: 60,
  },
  closeButton: {
    padding: 2,
    marginLeft: 4,
  },
  notificationDetailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    color: colors.gray900,
  },
  notificationDetailContent: {
    flex: 1,
    padding: 16,
  },
  detailSection: {
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray500,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 16,
    color: colors.gray900,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emergencyCallInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    backgroundColor: colors.gray50,
    borderRadius: 8,
  },
  callStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  notificationMap: {
    height: 200,
    marginTop: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  notificationLocation: {
    fontSize: 14,
    color: colors.gray500,
    marginTop: 4,
  },
});

export default UserDetailScreen; 