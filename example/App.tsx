import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  GPSStateListener,
  isPermissionEquals,
} from 'react-native-gps-state-listener';

const App = () => {
  React.useEffect(() => {
    gpsListener();
  }, []);

  const gpsListener = () => {
    console.log('GPS Listener');
    GPSStateListener.addListener((status: any) => {
      console.log(status);
      switch (status) {
        case GPSStateListener.NOT_DETERMINED:
          alert('yes');
          break;
        case GPSStateListener.RESTRICTED:
          {
            alert('no');
          }
          break;
        case GPSStateListener.DENIED:
          alert('no');
          break;
        case GPSStateListener.AUTHORIZED:
          alert('yes');
          break;
        case GPSStateListener.AUTHORIZED_ALWAYS:
          alert('yes');
          break;
        case GPSStateListener.AUTHORIZED_WHENINUSE:
          alert('yes');
          break;
        default:
          alert('yes');
          break;
      }
    });
    GPSStateListener.requestAuthorization(
      GPSStateListener.AUTHORIZED_WHENINUSE,
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>Hello</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
