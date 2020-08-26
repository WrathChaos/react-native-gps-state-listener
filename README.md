<img alt="React Native GPS State Listener" src="assets/logo.png" width="1050"/>

[![Battle Tested ✅](https://img.shields.io/badge/-Battle--Tested%20%E2%9C%85-03666e?style=for-the-badge)](https://github.com/WrathChaos/react-native-gps-state-listener)

[![React Native GPS State Listener](https://img.shields.io/badge/-Extremely%20easy%20to%20create%20a%20React%20Native%20Component%20Library%20with%20both%20Stateful%20and%20Functional%20Component%20Examples-orange?style=for-the-badge)](https://github.com/WrathChaos/react-native-gps-state-listener)

[![npm version](https://img.shields.io/npm/v/react-native-gps-state-listener.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-gps-state-listener)
[![npm](https://img.shields.io/npm/dt/react-native-gps-state-listener.svg?style=for-the-badge)](https://www.npmjs.com/package/react-native-gps-state-listener)
![Platform - Android and iOS](https://img.shields.io/badge/platform-Android%20%7C%20iOS-blue.svg?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<p align="center">
  <img alt="React Native GPS State Listener"
        src="assets/Screenshots/typescript.jpg" />
</p>

# Installation

Add the dependency:

```bash
npm i react-native-gps-state-listener
```

## iOS (Important!)

Go to your root ios folder and open up the `Podfile`

add this line:

```bash
pod 'react-native-gps-state-listener', :path => '../node_modules/react-native-gps-state-listener/lib/'
```

Then, run the pod install command:

```bash
npx pod-install
```

## Android Manual Installation

**android/settings.gradle**

```gradle
include ':react-native-gps-state-listener'
project(':react-native-gps-state-listener').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-gps-state-listener/android')
```

**android/app/build.gradle**

```gradle
dependencies {
   ...
   implementation project(':react-native-gps-state-listener')
}
```

**MainApplication.java**

On top, where imports are:

```java
import com.reactLibrary.RNGpsStateListenerPackage;
```

Add the `new RNGpsStateListenerPackage()` class to your list of exported packages.

```java
@Override
protected List<ReactPackage> getPackages() {
    return Arrays.asList(
            new MainReactPackage(),
            new RNGpsStateListenerPackage(),
    );
}
```

# Usage

## Import

```jsx
import GPSStateListener from "react-native-gps-state-listener";
```

## Fundamental Usage

```js
GPSStateListener.addListener((status: number) => {
  switch (status) {
    case GPSStateListener.NOT_DETERMINED:
      console.log("NOT_DETERMINED");
      break;
    case GPSStateListener.RESTRICTED:
      console.log("RESTRICTED");
      // ? Suggestion: Open settings for the asking the location permission
      break;
    case GPSStateListener.DENIED:
      console.log("DENIED");
      break;
    case GPSStateListener.AUTHORIZED:
      console.log("AUTHORIZED");
      break;
    case GPSStateListener.AUTHORIZED_ALWAYS:
      console.log("AUTHORIZED_ALWAYS");
      break;
    case GPSStateListener.AUTHORIZED_WHENINUSE:
      console.log("AUTHORIZED_WHENINUSE");
      break;
    default:
      console.log("DEFAULT");
      break;
  }
});
GPSStateListener.requestAuthorization(GPSStateListener.AUTHORIZED_WHENINUSE);
```

### Do not forget to remove the listener

```js
componentWillUnmount() {
	GPSStateListener.removeListener()
}
```

### Constants

| Platform      | Status Code | Constant             | Description                                                                                                                   |
| :------------ | :---------: | :------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| iOS / Android |      0      | NOT_DETERMINED       | The user has not yet made a choice regarding whether this app can use location services.                                      |
| iOS / Android |      1      | RESTRICTED           | This app is not authorized to use location services.                                                                          |
| iOS / Android |      2      | DENIED               | The user explicitly denied the use of location services for this app or location services are currently disabled in Settings. |
| iOS / Android |      3      | AUTHORIZED           | This app is authorized to use location services.                                                                              |
| iOS           |      3      | AUTHORIZED_ALWAYS    | This app is authorized to start location services at any time.                                                                |
| iOS           |      4      | AUTHORIZED_WHENINUSE | This app is authorized to start most location services while running in the foreground                                        |

#### Methods

```js
// Open a system dialog requesting permission
// authType could be one of `AUTHORIZED_ALWAYS` or `AUTHORIZED_WHENINUSE`
GPSStateListener.requestAuthorization(authType);
```

```js
// ANDROID ONLY
// return true if system version is Marshmallow or above
GPSStateListener.isMarshmallowOrAbove();
```

```js
// return true if the location permission is granted
GPSStateListener.isAuthorized();
```

```js
// return true if the location permission is denied
GPSStateListener.isDenied();
```

```js
// Get the current GPS state
GPSStateListener.getStatus().then((status) => {});
```

## Future Plans

- [x] ~~LICENSE~~
- [ ] Write an article about the lib on Medium

## Credits

Heavily based on [React Native GPS State](https://github.com/neuberoliveira/react-native-gps-state) (Old and deprecated)
Removed iOS and Android `openSettings` feature because of the bug and not necessary for this library.

## Author

FreakyCoder, kurayogun@gmail.com

## License

React Native GPS State Listener is available under the MIT license. See the LICENSE file for more info.

```

```
