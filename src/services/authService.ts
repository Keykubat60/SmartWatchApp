import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Ändern Sie dies zur tatsächlichen Backend-URL

export const authService = {
  async sendVerificationCode(phoneNumber: string): Promise<void> {
    try {
      await axios.post(`${API_URL}/auth/send-code`, { phoneNumber });
    } catch (error) {
      throw new Error('Fehler beim Senden des Codes');
    }
  },

  async verifyCode(phoneNumber: string, code: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${API_URL}/auth/verify-code`, {
        phoneNumber,
        code,
      });
      return response.data;
    } catch (error) {
      throw new Error('Ungültiger Code');
    }
  },
}; 