export const colors = {
  // Primärfarben
  primary: '#7C3AED', // Violett
  primaryDark: '#6D28D9',
  primaryLight: '#8B5CF6',

  // Status Farben
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',

  // Graustufen
  white: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  black: '#000000',

  // Hintergrundfarben
  background: '#F9FAFB',
  surface: '#FFFFFF',
  
  // Schatten
  shadow: '#000000',
};

// Batterie-Icon Konfiguration
export const getBatteryConfig = (level: number) => {
  if (level <= 20) {
    return {
      icon: 'battery-0-bar',
      color: colors.error
    };
  } else if (level <= 30) {
    return {
      icon: 'battery-2-bar',
      color: colors.warning
    };
  } else if (level <= 50) {
    return {
      icon: 'battery-4-bar',
      color: colors.warning
    };
  } else if (level <= 80) {
    return {
      icon: 'battery-6-bar',
      color: colors.success
    };
  } else {
    return {
      icon: 'battery-std',
      color: colors.success
    };
  }
}; 