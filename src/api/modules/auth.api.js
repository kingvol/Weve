import Api from '../api.base';

/**
 * @name Class AuthApi
 * @extends Api
 */
export default class AuthApi extends Api {
  loginUserByEmail = async (creds) => {
    try {
      const response = await this.request('api/login', {
        method: 'POST',
        body: JSON.stringify(creds),
      });
      if (response.message || response.error) { // check for error
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }

  signupUserByEmail = async (data) => {
    try {
      const response = await this.request('api/register', {
        method: 'POST',
        body: JSON.stringify(data),
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
}
