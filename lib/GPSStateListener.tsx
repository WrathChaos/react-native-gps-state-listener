import * as React from "react";
import { NativeModules, NativeEventEmitter, Platform } from "react-native";
/**
 * ? Local Imports
 */
import { ListenerFunc, GPSStateType, GPSStateListenerProps } from "./utils";

const GPSStateListenerNative = NativeModules.GPSState;
const isAndroid = Platform.OS == "android";
const isIOS = Platform.OS == "ios";
const gpsStateEmitter = new NativeEventEmitter(GPSStateListenerNative);

var _subscription;
var _listener: ListenerFunc | null = null;
var _isListening: boolean = true;
var _currentStatus: number = GPSStateListenerNative.NOT_DETERMINED;
var _isMarshmallowOrAbove: boolean = false;

// ? Get the current status of the GPS
GPSStateListenerNative.getStatus().then(
  (status: number) => (_currentStatus = status),
);
if (isAndroid) {
  GPSStateListenerNative.isMarshmallowOrAbove().then(
    (isM: boolean) => (_isMarshmallowOrAbove = isM),
  );
}

// ? Set the GPSListener subscription
_subscription = gpsStateEmitter.addListener("OnStatusChange", (response) => {
  var status: number;
  if (isIOS) status = response;
  else status = response.status;

  _currentStatus = status;
  if (_listener && status && _isListening) {
    _listener(status);
  }
});

export const GPSStateListener = {
  isMarshmallowOrAbove: () => {
    return _isMarshmallowOrAbove;
  },

  isAuthorized: () =>
    isPermissionEquals(GPSStateListenerNative.AUTHORIZED_WHENINUSE) ||
    isPermissionEquals(GPSStateListenerNative.AUTHORIZED_ALWAYS),
  isDenied: () => isPermissionEquals(GPSStateListenerNative.DENIED),
  isRestricted: () => isPermissionEquals(GPSStateListenerNative.RESTRICTED),
  isNotDetermined: () =>
    isPermissionEquals(GPSStateListenerNative.NOT_DETERMINED),

  addListener: (callback: ListenerFunc) => {
    if (typeof callback == "function") {
      _isListening = true;
      _listener = callback;
      GPSStateListenerNative.startListen();
    }
  },

  removeListener: () => {
    _isListening = false;
    _listener = null;
    GPSStateListenerNative.stopListen();
  },

  getStatus: () => GPSStateListenerNative.getStatus(),

  requestAuthorization: (authType: GPSStateType) => {
    if (isIOS) {
      var type = authType;
      var min = GPSStateListenerNative.STATUS_NOT_DETERMINED;
      var max = GPSStateListenerNative.STATUS_AUTHORIZED_WHENINUSE;
      var inRange = type >= min && type <= max;

      if (!inRange) {
        type = GPSStateListenerNative.AUTHORIZED_WHENINUSE;
      }
      GPSStateListenerNative.requestAuthorization(type);
    } else {
      GPSStateListenerNative.requestAuthorization();
    }
  },
};

export const isPermissionEquals = (expectedPerm: number) => {
  return _currentStatus == expectedPerm;
};
