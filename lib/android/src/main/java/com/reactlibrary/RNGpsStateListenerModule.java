
package com.reactlibrary;


import android.Manifest;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.location.LocationManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.app.ActivityCompat;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;

public class RNGpsStateListenerModule extends ReactContextBaseJavaModule {
  private final ReactApplicationContext reactContext;
  // ? GPS Status Constants
  private static final int STATUS_NOT_DETERMINED = 0;
  private static final int STATUS_RESTRICTED = 1; // Location is disabled
  private static final int STATUS_DENIED = 2; // Permission for app to use location is denied
  private static final int STATUS_AUTHORIZED = 3; // Permission for app to use location is granted
  private static final int STATUS_AUTHORIZED_ALWAYS = 3; // Same as STATUS_AUTHORIZED
  private static final int STATUS_AUTHORIZED_WHENINUSE = 4; // Permission for app to use location when in use is granted

  private static final int REQUEST_CODE_AUTHORIZATION = 2308;
  private static final String EVENT_STATUS_CHANGE = "OnStatusChange";


  private BroadcastReceiver gpsStateReceiver = null;
  private LocationManager locationManager;

  private boolean isListen = false;
  private int targetSdkVersion = -1;
  private int deviceSdkVersion = Build.VERSION.SDK_INT;
  private int currentStatus = STATUS_NOT_DETERMINED;

  public RNGpsStateListenerModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;

    locationManager = (LocationManager) reactContext.getSystemService(reactContext.LOCATION_SERVICE);
    try {
        final PackageInfo info = reactContext.getPackageManager().getPackageInfo(reactContext.getPackageName(), 0);
        targetSdkVersion = info.applicationInfo.targetSdkVersion;
    } catch (PackageManager.NameNotFoundException e) {
        e.printStackTrace();
    }
  }

  @Override
  public String getName() {
    return "RNGpsStateListener";
  }


  @Override
  public Map<String, Object> getConstants() {
      final Map<String, Object> constants = new HashMap<>();
      constants.put("NOT_DETERMINED", STATUS_NOT_DETERMINED);
      constants.put("RESTRICTED", STATUS_RESTRICTED);
      constants.put("DENIED", STATUS_DENIED);
      constants.put("AUTHORIZED", STATUS_AUTHORIZED);
      constants.put("AUTHORIZED_ALWAYS", STATUS_AUTHORIZED_ALWAYS);
      constants.put("AUTHORIZED_WHENINUSE", STATUS_AUTHORIZED_WHENINUSE);
      return constants;
  }

  @ReactMethod
  void startListen() {
      stopListen();
      try {
          gpsStateReceiver = new GPSProvideChangeReceiver();
          getReactApplicationContext().registerReceiver(gpsStateReceiver, new IntentFilter(LocationManager.PROVIDERS_CHANGED_ACTION));
          isListen = true;
      } catch (Exception ex) {
      }
  }

  @ReactMethod
  void stopListen() {
      isListen = false;
      try {
          //locationManager.removeGpsStatusListener(this);
          if (gpsStateReceiver != null) {
              getReactApplicationContext().unregisterReceiver(gpsStateReceiver);
              gpsStateReceiver = null;
          }
      } catch (Exception ex) {
      }
  }

  @ReactMethod
  void getStatus(Promise promise) {
      promise.resolve(getGpsState());
  }

  @ReactMethod
  void isMarshmallowOrAbove(Promise promise) {
      promise.resolve(_NativeIsDeviceMOrAbove());
  }

  boolean _NativeIsDeviceMOrAbove() {
      return deviceSdkVersion >= Build.VERSION_CODES.M;
  }

  boolean _NativeIsTargetMOrAbove() {
      return targetSdkVersion >= Build.VERSION_CODES.M;
  }

  int getGpsState() {
    int status;
    boolean enabled = isGpsEnabled();

    if (_NativeIsDeviceMOrAbove()) {
        boolean isGranted = isPermissionGranted();

        if (enabled) {
            if (isGranted) {
                status = STATUS_AUTHORIZED;
            } else {
                status = STATUS_DENIED;
            }
        } else {
            status = STATUS_RESTRICTED;
        }
    } else {
        status = (enabled ? STATUS_AUTHORIZED : STATUS_RESTRICTED);
    }

    currentStatus = status;
    return status;
}

int getPermission() {
    return ActivityCompat.checkSelfPermission(getReactApplicationContext(), Manifest.permission.ACCESS_FINE_LOCATION);
}

boolean isPermissionGranted() {
    int permission = getPermission();
    return permission == PackageManager.PERMISSION_GRANTED;
}


boolean isGpsEnabled() {
  return locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER);
}

void sendEvent(int status) {
  ReactContext reactContext = getReactApplicationContext();
  WritableMap params = Arguments.createMap();
  params.putInt("status", status);

  reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(EVENT_STATUS_CHANGE, params);
}

private final class GPSProvideChangeReceiver extends BroadcastReceiver {
  @Override
  public void onReceive(Context context, Intent intent) {
      String action = intent.getAction();
      if (action.matches("android.location.PROVIDERS_CHANGED")) {
          sendEvent(getGpsState());
      }
  }
}

}