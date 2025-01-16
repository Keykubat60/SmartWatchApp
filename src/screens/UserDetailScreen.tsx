import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { LineChart } from 'react-native-chart-kit';
import { User } from '../types/index';

interface UserDetailScreenProps {
  route: {
    params: {
      user: User;
    };
  };
}

const MOCK_HEALTH_DATA = {
  labels: ['00:00', '06:00', '12:00', '18:00', '24:00'],
  heartRate: [75, 72, 78, 82, 76],
  steps: [0, 1200, 4500, 8900, 10200],
};

const UserDetailScreen = ({ route }: UserDetailScreenProps) => {
  const { user } = route.params;
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 52.520008,  // Beispielkoordinaten für Berlin
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

      <BottomSheet
        snapPoints={['30%', '60%']}
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
  },
  map: {
    width: '100%',
    height: '100%',
  },
  bottomSheetContent: {
    padding: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginBottom: 24,
    borderRadius: 8,
  },
});

export default UserDetailScreen; 