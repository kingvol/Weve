//You can refrence from example.
//import stripe from 'tipsi-stripe'
//Opens the user interface to set up credit cards for  Pay.
    //stripe.openApplePaySetup()
//Returns whether the user can make Apple Pay payments. User may not be able to make payments for a variety of reasons. For example, this functionality may not be supported by their hardware, or it may be restricted by parental controls.
    //await stripe.deviceSupportsApplePay()
// .canMakeApplePayPayments([options]) -> Promise
// Method is deprecated, use canMakeNativePayPayments() instead
    // await stripe.canMakeApplePayPayments()
    // await stripe.canMakeApplePayPayments(['american_express', 'discover'])
// const items = [{
//     label: 'Whisky',
//     amount: '50.00',
//     }, {
//     label: 'Tipsi, Inc',
//     amount: '50.00',
//     }]

//     const shippingMethods = [{
//     id: 'fedex',
//     label: 'FedEX',
//     detail: 'Test @ 10',
//     amount: '10.00',
//     }]

//     const options = {
//     requiredBillingAddressFields: ['all'],
//     requiredShippingAddressFields: ['phone', 'postal_address'],
//     shippingMethods,
//     }

//     const token = await stripe.paymentRequestWithApplePay(items, options)
//createTokenWithBankAccount(params) -> Promise
    // const params = {
    //     // mandatory
    //     accountNumber: '000123456789',
    //     countryCode: 'us',
    //     currency: 'usd',
    //     // optional
    //     routingNumber: '110000000', // 9 digits
    //     accountHolderName: 'Test holder name',
    //     accountHolderType: 'company', // "company" or "individual"
    //   }

    //   const token = await stripe.createTokenWithBankAccount(params)

//Example
// {
//     livemode: false,
//     amount: 50,
//     owner: {},
//     metadata: {},
//     clientSecret: 'src_client_secret_BLnXIZxZprDmdhw3zv12123L',
//     details: {
//       native_url: null,
//       statement_descriptor: null
//     },
//     type: 'alipay',
//     redirect: {
//       url: 'https://hooks.stripe.com/redirect/authenticate/src_1Az5vzE5aJKqY779Kes5s61m?client_secret=src_client_secret_BLnXIZxZprDmdhw3zv12123L',
//       returnURL: 'example://stripe-redirect?redirect_merchant_name=example',
//       status: 'succeeded'
//     },
//     usage: 'single',
//     created: 1504713563,
//     flow: 'redirect',
//     currency: 'eur',
//     status: 'chargable',
//   }
// const items = [{
//     label: 'Whisky',
//     amount: '50.00',
//   }, {
//     label: 'Tipsi, Inc',
//     amount: '50.00',
//   }]

//   const shippingMethods = [{
//     id: 'fedex',
//     label: 'FedEX',
//     detail: 'Test @ 10',
//     amount: '10.00',
//   }]

//   const options = {
//     requiredBillingAddressFields: 'all',
//     requiredShippingAddressFields: 'all',
//     shippingMethods,
//   }

//   try {
//     await stripe.paymentRequestWithApplePay(items, options)

//     // You should complete the operation by calling
//     // stripe.completeApplePayRequest()
//   } catch (error) {
//     // Or cancel if an error occurred
//     stripe.cancelApplePayRequest()
//   }



///Token
// token — an object with the following keys
// KEY	TYPE	DESCRIPTION
// tokenId	String	The value of the token. You can store this value on your server and use it to make charges and customers
// created	Number	When the token was created
// livemode	Number	Whether or not this token was created in livemode. Will be 1 if you used your Live Publishable Key, and 0 if you used your Test Publishable Key
// card	Object	The credit card details object that were used to create the token
// bankAccount	Object	The external (bank) account details object that were used to create the token
// extra	Object	An additional information that method can provide
// card — an object with the following keys
// KEY	TYPE	DESCRIPTION
// cardId	String	The Stripe ID for the card
// brand	String	The card’s brand. Can be one of: **JCB **‖ **American Express **‖ **Visa **‖ **Discover **‖ **Diners Club **‖ **MasterCard **‖ Unknown
// funding (iOS)	String	The card’s funding. Can be one of: **debit **‖ **credit **‖ **prepaid **‖ unknown
// last4	String	The last 4 digits of the card
// dynamicLast4 (iOS)	String	For cards made with Apple Pay, this refers to the last 4 digits of the Device Account Number for the tokenized card
// isApplePayCard (iOS)	Bool	Whether or not the card originated from Apple Pay
// expMonth	Number	The card’s expiration month. 1-indexed (i.e. 1 == January)
// expYear	Number	The card’s expiration year
// country	String	Two-letter ISO code representing the issuing country of the card
// currency	String	This is only applicable when tokenizing debit cards to issue payouts to managed accounts. The card can then be used as a transfer destination for funds in this currency
// name	String	The cardholder’s name
// addressLine1	String	The cardholder’s first address line
// addressLine2	String	The cardholder’s second address line
// addressCity	String	The cardholder’s city
// addressState	String	The cardholder’s state
// addressCountry	String	The cardholder’s country
// addressZip	String	The cardholder’s zip code
// bankAccount
// KEY	TYPE	DESCRIPTION
// routingNumber	String	The routing number of this account
// accountNumber	String	The account number for this BankAccount.
// countryCode	String	The two-letter country code that this account was created in
// currency	String	The currency of this account
// accountHolderName	String	The account holder's name
// accountHolderType	String	the bank account type. Can be one of: **company **‖ individual
// fingerprint	String	The account fingerprint
// bankName	String	The name of bank
// last4	String	The last four digits of the account number