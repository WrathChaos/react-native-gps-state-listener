import React from "react";
import { Text, StatusBar, SafeAreaView } from "react-native";
import { GPSStateListener } from "react-native-gps-state-listener";

const App = () => {
  React.useEffect(() => {
    gpsListener();
  }, []);

  const gpsListener = () => {
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
    GPSStateListener.requestAuthorization(
      GPSStateListener.AUTHORIZED_WHENINUSE,
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text>React Native GPS State Listener</Text>
      </SafeAreaView>
    </>
  );
};

export default App;
