import React from "react";
import { Text, StatusBar, SafeAreaView } from "react-native";
import { GPSStateListener } from "react-native-gps-state-listener";

const App = () => {
  React.useEffect(() => {
    gpsListener();
  }, []);

  const gpsListener = () => {
    GPSStateListener.addListener((status: any) => {
      alert(JSON.stringify(status));
      switch (status) {
        case GPSStateListener.NOT_DETERMINED:
          alert("NOT_DETERMINED");
          break;
        case GPSStateListener.RESTRICTED:
          alert("RESTRICTED");
          break;
        case GPSStateListener.DENIED:
          alert("DENIED");
          break;
        case GPSStateListener.AUTHORIZED:
          alert("AUTHORIZED");
          break;
        case GPSStateListener.AUTHORIZED_ALWAYS:
          alert("AUTHORIZED_ALWAYS");
          break;
        case GPSStateListener.AUTHORIZED_WHENINUSE:
          alert("AUTHORIZED_WHENINUSE");
          break;
        default:
          alert("DEFAULT");
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
