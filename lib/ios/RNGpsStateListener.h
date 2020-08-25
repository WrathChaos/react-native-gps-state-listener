
#if __has_include("RCTBridgeModule.h")
#import "RCTBridgeModule.h"
#else
#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <React/RCTLog.h>
#endif

@interface RNGpsStateListener : RCTEventEmitter <RCTBridgeModule, CLLocationManagerDelegate>

@end
