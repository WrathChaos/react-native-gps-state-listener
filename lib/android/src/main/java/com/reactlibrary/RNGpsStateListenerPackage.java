
package com.reactlibrary;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;
public class RNGpsStateListenerPackage implements ReactPackage {

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();
       //We import the module file here
       modules.add(new RNGpsStateListenerModule(reactContext));

       return modules;
   }

    // Deprecated from RN 0.47
    // Backward compatibility
   public List<Class<? extends JavaScriptModule>> createJSModules() {
    return new ArrayList<>();
}

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
      return Collections.emptyList();
    }
}