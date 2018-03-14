# Wevedo App

## Get started

1.  Clone the repo
2.  Install dependencies `yarn`
3.  Run on Android: `react-native run-android`
4.  Run on IOS: `react-native run-ios`

When you run first time if you get: command not found : react-native then run
`yarn add react-native-cli -g`

## Using Android emulator

To develop using an emulator you can use Genymotion.
Please note that the app using Google Services, so your Android must have them installed.
For Genymotion, click GAPPS button on top left corner to install. Android 4.4.4 is recommended for that (GAPPS crashes on newer versions).

If your processor supports virtualization (new Intel processors usually supports it) you can use NOX App Player or standard Android emulator.
Note that your emulator will run very slowly if your processor does not support virtualization.

## Using IOS simulator

Mac OS is needed to build the app and run simulator.

### Use prettier-eslint for developing

Prettier will auto-format your code based on eslint rules whenever you save a file.

1.  Make sure what plugin for your IDE installed (for VS Code it is 'Prettier - Code formatter')
2.  Your VS Code Workspace Settings should look like this:

`// Enable/disable default JavaScript formatter (For Prettier)`

`"javascript.format.enable": false,`
`"prettier.eslintIntegration": true`

<!--

## Deploy specific build:

1.  Select a build you need to deploy
2.  Go to "Google Play tab"
3.  Select application wevedo
4.  Press "Alpha Testing" button
5.  Press "Publish to the Google Play Store" button

## Troubleshouting:

If you get below written error you run : npm install

"[server error] Cannot load the stats for react-native-firebase please try again later"

Then follow :

1.  Run this command anywhere : sudo gem install cocoapods
2.  Go to ios folder
3.  Run : pod install

androidpublisher - permissionDenied
The current user has insufficient permissions to perform the requested operation.

You need to grant administrator permissions (manager release permissions is not enough) to Google API account, that buddybuild is using.

androidpublisher - cannotUpdateApksOnTrackWithDraftRelease
Cannot update the APK configuration of the track when the track has a draft release. Please use UI to rollout or discard the draft release.

You need to remove all draft app releases from the track in Google Play Console
Settings -> Release management -> App releases -> Edit Release -> Discard

## APNs certificate setup

1.  Generate APNS certificate for iOS Push Notifications
    https://medium.com/@ankushaggarwal/generate-apns-certificate-for-ios-push-notifications-85e4a917d522
    https://firebase.google.com/docs/cloud-messaging/ios/certs
    Result: got .p12 APNs certificate

2.  Configure APNs with FCM.
    Upload generated .p12 certificate in Firebase Console:
    https://stackoverflow.com/questions/37583810/where-i-upload-apns-p12-cert-file-in-firebase-consol

APNs overview:
https://developer.apple.com/library/content/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/APNSOverview.html

## IOS notifications troubleshooting

1.  Test notifications only on IOS device. IOS emulator won't receive any push notification, only device can.
2.  Try to send notification manually via Firebase Console and check if it sends without any error:
    Firebase Console -> Notifications -> Send notification: - Directly to a device. You will need to get FCM token:
    FCM.getFCMToken().then(token => { console.log(token) }); - Send to a topic (can be viewed in firebase logs)
3.  Check if firebase sends notification after message send:
    Firebase Console -> Functions -> Logs
    Should have entry like "Sent notification to topic ios-chatroom-L3gI9Pp3AxZ6-UFewi-"
4.  You also can check log in xcode to see if Firebase SDK throws any error. -->
