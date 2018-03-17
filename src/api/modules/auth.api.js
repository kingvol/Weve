import Api from '../api.base';

/**
 * @name Class AuthApi
 * @extends Api
 */
export default class AuthApi extends Api {
  loginUserByEmail = creds => this.request('api/login', {
    method: 'POST',
    body: JSON.stringify(creds),
  });

  signupUserByEmail = data => this.request('api/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
