#/bin/sh

sed -i'' -e 's/@import Firebase;/\
#import <FirebaseCore\/FirebaseCore.h>;\
#import <FirebaseMessaging\/FirebaseMessaging.h>;\
#import <FirebaseInstanceID\/FirebaseInstanceID.h>;/' ./node_modules/react-native-fcm/ios/RNFIRMessaging.h