import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';

const AuthScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const handleSendCode = async () => {
    try {
      // TODO: API-Aufruf zum Senden des Codes
      setShowVerification(true);
    } catch (error) {
      Alert.alert('Fehler', 'Code konnte nicht gesendet werden');
    }
  };

  const handleVerifyCode = async () => {
    try {
      // TODO: API-Aufruf zur Überprüfung des Codes
    } catch (error) {
      Alert.alert('Fehler', 'Code konnte nicht überprüft werden');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Willkommen</Text>
      
      {!showVerification ? (
        <>
          <Text style={styles.subtitle}>
            Bitte geben Sie Ihre Telefonnummer ein
          </Text>
          <TextInput
            style={styles.input}
            placeholder="+49 123 456789"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={handleSendCode}
          >
            <Text style={styles.buttonText}>Code senden</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.subtitle}>
            Bitte geben Sie den Code ein, den Sie per SMS erhalten haben
          </Text>
          <TextInput
            style={styles.input}
            placeholder="123456"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
            maxLength={6}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={handleVerifyCode}
          >
            <Text style={styles.buttonText}>Code überprüfen</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.gray900,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.gray500,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray200,
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: colors.white,
    color: colors.gray900,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AuthScreen; 