import FCM from 'react-native-fcm';
import OneSignal from 'react-native-onesignal';
import { Platform } from 'react-native';
import Api from '../api.base';

/**
 * @name Class AuthApi
 * @extends Api
 */
export default class AuthApi extends Api {
  loginUserByEmail = async (creds) => {
    await OneSignal.init('32572554-6b4f-4d8c-be27-89aa4aefce30', {
      kOSSettingsKeyAutoPrompt: true,
    });
    // const deviceToken =
    //   'cUAz3euP93c:APA91bFrliwb3Sgyv_PuwYVdgPz-k41pbKHirSi5ii3HdxtPn-6vrAJVZHgpa3E4pz8nqUIMQc251Ub-F5EXXALy-iasZWCW1oop4T58Yr-pz0JQreL4ebI5dc4H71ahLQqH2DeXmQk3';
    await OneSignal.getPermissionSubscriptionState(async (status) => {
      const deviceToken = status.pushToken;

      try {
        const response = this.request('api/login', {
          method: 'POST',
          body: JSON.stringify(Object.assign(creds, { deviceToken, deviceOS: Platform.OS })),
        });
        if (response.message || response.error) {
          // check for error
          return Promise.reject(response);
        }
        return response;
      } catch ({ message }) {
        throw Error(message);
      }
    });
  };

  signupUserByEmail = async (data) => {
    const deviceToken =
      'cUAz3euP93c:APA91bFrliwb3Sgyv_PuwYVdgPz-k41pbKHirSi5ii3HdxtPn-6vrAJVZHgpa3E4pz8nqUIMQc251Ub-F5EXXALy-iasZWCW1oop4T58Yr-pz0JQreL4ebI5dc4H71ahLQqH2DeXmQk3';
    // try {
    //   await FCM.requestPermissions();
    //   const token = await FCM.getFCMToken();
    //   deviceToken = token;
    // } catch (error) {
    //   console.warn(error);
    // }

    try {
      const response = await this.request('api/register', {
        method: 'POST',
        body: JSON.stringify(Object.assign(data, { deviceToken, deviceOS: Platform.OS })),
      });
      if (response.message || response.error) {
        // check for error
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  checkEmail = async (email) => {
    try {
      const response = await this.request('api/check-email', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  checkPhone = async (phoneNumber) => {
    try {
      const response = await this.request('api/check-phone', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
      });
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  requestVerification = async (number) => {
    try {
      const response = await this.request(`api/verify-mobile/${number}`);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  resetPasswordRequest = async (phoneNumber, resetPassword) => {
    try {
      const response = await this.request('api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, resetPassword }),
      });
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  checkResetCode = async (phoneNumber, resetToken) => {
    try {
      const response = await this.request('api/check-reset-password', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber, resetToken }),
      });
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  signout = async () => {
    try {
      await this.request('api/signout');
    } catch ({ message }) {
      throw Error(message);
    }
  };
}
