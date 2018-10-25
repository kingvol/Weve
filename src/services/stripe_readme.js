// 1.yarn add tipsi-stripe
// 2.
// Setup your Podfile like the included wevedo-app/ios/Podfile then run pod install.
// Open your project in Xcode workspace.
// Drag the following folder into your project:
// node_modules/tipsi-stripe/ios/TPSStripe/
// 3.Linking
// Run react-native link tipsi-stripe so your project is linked against your Xcode project and all CocoaPods dependencies are installed
// Open your project in Xcode, right click on Libraries and click Add Files to "Your Project Name".

// Look under node_modules/tipsi-stripe/ios and add TPSStripe.xcodeproj.

// Add libTPSStripe.a to Build Phases → Link Binary With Libraries.

// Click on TPSStripe.xcodeproj in Libraries and go the Build Settings tab.
// Double click the text to the right of Header Search Paths and verify that it has

// $(SRCROOT)/../../react-native/React
// ${SRCROOT}/../../../ios/Pods/Headers/Public
// If they aren't, then add them. This is so Xcode is able to find the headers that the TPSStripe source files are referring to by pointing to the header files installed within the react-native node_modules directory.

// Whenever you want to use it within React code now you can:

// import stripe from 'tipsi-stripe'
// 4.
// Usage
// stripe.setOptions({
//   publishableKey: 'PUBLISHABLE_KEY',
//   merchantId: 'MERCHANT_ID', // Optional
//   androidPayMode: 'test', // Android only
// })