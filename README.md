# Smart Watch Monitoring Frontend

Diese React Native App dient als Frontend für das Smart Watch Monitoring System. Sie ermöglicht die Überwachung von Smartwatch-Trägern, zeigt deren Standort, Gesundheitsdaten und Status in Echtzeit an.

## Voraussetzungen

- Node.js (Version 18 oder höher)
- npm oder yarn
- Ruby (für iOS)
- CocoaPods (für iOS)
- Android Studio (für Android)
- Xcode (für iOS, nur auf macOS)
- Git

## Installation

1. Repository klonen:
```bash
git clone [repository-url]
cd TemporaryProject
```

2. Dependencies installieren:
```bash
# Node Module installieren
npm install

# iOS-spezifische Installation (nur macOS)
cd ios
bundle install
bundle exec pod install
cd ..
```

3. Environment einrichten:
- Stellen Sie sicher, dass Android Studio korrekt eingerichtet ist (für Android)
- Stellen Sie sicher, dass Xcode installiert ist (für iOS)

## Entwicklung starten

1. Metro Bundler starten:
```bash
npm start
```

2. App auf Emulator/Gerät starten:

Für iOS (nur macOS):
```bash
npm run ios
```

Für Android:
```bash
npm run android
```

## Projektstruktur

```
src/
  ├── navigation/     # Navigation und Routing
  ├── screens/        # Screen-Komponenten
  ├── types/          # TypeScript Definitionen
  └── services/       # API und andere Services
```

## Features

- Benutzerauthentifizierung
- Übersicht der überwachten Personen
- Detailansicht mit:
  - Standort auf Karte
  - Gesundheitsdaten-Visualisierung
  - Echtzeit-Status-Updates

## Troubleshooting

### Häufige Probleme

1. Metro Bundler startet nicht:
```bash
npm start -- --reset-cache
```

2. iOS Build schlägt fehl:
```bash
cd ios
pod deintegrate
pod install
cd ..
```

3. Android Build schlägt fehl:
```bash
cd android
./gradlew clean
cd ..
```

## Entwicklungshinweise

- Verwenden Sie `npm start -- --reset-cache` wenn Sie Probleme mit dem Cache haben
- Für iOS-Entwicklung stellen Sie sicher, dass CocoaPods aktuell ist
- Für Android-Entwicklung stellen Sie sicher, dass das Android SDK korrekt eingerichtet ist

## Support

Bei Fragen oder Problemen wenden Sie sich an das Entwicklungsteam.

npx react-native start --reset-cache

cd TemporaryProject
npm install
cd ios
pod install

npx react-native run-ios