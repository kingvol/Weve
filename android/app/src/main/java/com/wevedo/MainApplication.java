package com.wevedo;

import android.app.Application;
import android.support.annotation.NonNull;

import com.facebook.react.ReactApplication;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.vydia.RNUploader.UploaderReactPackage;
import com.rnfingerprint.FingerprintAuthPackage;
import com.oblador.keychain.KeychainPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.imagepicker.ImagePickerPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.gettipsi.stripe.StripeReactPackage;

import com.reactnativenavigation.NavigationApplication;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication  {
  @Override
  public boolean isDebug() {
    return BuildConfig.DEBUG;
  }

  @NonNull
  @Override
  public List<ReactPackage> createAdditionalReactPackages() {
    return Arrays.<ReactPackage>asList(
    new MainReactPackage(),
    new StripeReactPackage(),
    new ReactNativeOneSignalPackage(),
    new LottiePackage(),
    new KCKeepAwakePackage(),
    new LinearGradientPackage(),
    new OrientationPackage(),
    new ReactVideoPackage(),
    new UploaderReactPackage(),
    new FingerprintAuthPackage(),
    new KeychainPackage(),
    new ImageResizerPackage(),
    new RNDeviceInfo(),
    new FIRMessagingPackage(),
    new ImagePickerPackage(),
    new VectorIconsPackage(),
    new RNI18nPackage(),
    new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appCenterCrashes_whenToSendCrashes)),
    new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appCenterAnalytics_whenToEnableAnalytics)),
    new AppCenterReactNativePackage(MainApplication.this),
    new FastImageViewPackage()
    );
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }

  @Override
    public String getJSMainModuleName() {
      return "index";
    }
}
