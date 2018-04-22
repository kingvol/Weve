import FCM from 'react-native-fcm';
import { Platform } from 'react-native';
import Api from '../api.base';

/**
 * @name Class AuthApi
 * @extends Api 
 */
export default class AuthApi extends Api {
  loginUserByEmail = async (creds) => {
    try {
      const deviceToken = await FCM.requestPermissions().then(() => FCM.getFCMToken());
      const response = await this.request('api/login', {
        method: 'POST',
        body: JSON.stringify(Object.assign(creds, { deviceToken, deviceOS: Platform.OS })),
      });
      if (response.message || response.error) { // check for error
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }

  signupUserByEmail = async (data) => {
    try {
      const deviceToken = await FCM.requestPermissions().then(() => FCM.getFCMToken());
      const response = await this.request('api/register', {
        method: 'POST',
        body: JSON.stringify(Object.assign(data, { deviceToken, deviceOS: Platform.OS })),
      });
      if (response.message || response.error) { // check for error
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }

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
    } catch ({ message }) { throw Error(message); }
  }

  resetPasswordRequest = async (email, resetPassword) => {
    try {
      const response = await this.request('api/reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, resetPassword }),
      });
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }

  checkResetCode = async (email, resetToken) => {
    try {
      const response = await this.request('api/check-reset-password', {
        method: 'POST',
        body: JSON.stringify({ email, resetToken }),
      });
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }

  signout = async () => {
    try {
      await this.request('api/signout');
    } catch ({ message }) {
      throw Error(message);
    }
  }
}
