import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { useNavigation } from '@react-navigation/native';

const AddUserScreen = () => {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    street: '',
    houseNumber: '',
    postalCode: '',
    city: '',
    imei: '',
    code: '',
  });

  const handleSubmit = () => {
    // Validierung
    if (Object.values(formData).some(value => !value)) {
      Alert.alert('Fehler', 'Bitte füllen Sie alle Felder aus');
      return;
    }

    // Hier würde normalerweise der API-Call kommen
    console.log('Neuer Nutzer:', formData);
    Alert.alert(
      'Erfolg',
      'Nutzer wurde erfolgreich hinzugefügt',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Neuen Nutzer hinzufügen</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Vorname</Text>
        <TextInput
          style={styles.input}
          value={formData.firstName}
          onChangeText={(value) => updateField('firstName', value)}
          placeholder="Max"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Nachname</Text>
        <TextInput
          style={styles.input}
          value={formData.lastName}
          onChangeText={(value) => updateField('lastName', value)}
          placeholder="Mustermann"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Alter</Text>
        <TextInput
          style={styles.input}
          value={formData.age}
          onChangeText={(value) => updateField('age', value)}
          placeholder="65"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Straße</Text>
        <TextInput
          style={styles.input}
          value={formData.street}
          onChangeText={(value) => updateField('street', value)}
          placeholder="Musterstraße"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Hausnummer</Text>
        <TextInput
          style={styles.input}
          value={formData.houseNumber}
          onChangeText={(value) => updateField('houseNumber', value)}
          placeholder="123"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>PLZ</Text>
        <TextInput
          style={styles.input}
          value={formData.postalCode}
          onChangeText={(value) => updateField('postalCode', value)}
          placeholder="12345"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Stadt</Text>
        <TextInput
          style={styles.input}
          value={formData.city}
          onChangeText={(value) => updateField('city', value)}
          placeholder="Berlin"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>IMEI</Text>
        <TextInput
          style={styles.input}
          value={formData.imei}
          onChangeText={(value) => updateField('imei', value)}
          placeholder="123456789012345"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Code</Text>
        <TextInput
          style={styles.input}
          value={formData.code}
          onChangeText={(value) => updateField('code', value)}
          placeholder="ABC123"
        />
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>Nutzer hinzufügen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.gray900,
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
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddUserScreen; 