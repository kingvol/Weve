import Api from '../api.base';

const resource = 'api/profiders';

/**
 * @name Class ProviderApi
 * @extends Api
 */
export default class ProviderApi extends Api {
  constructor() {
    super(resource);
  }

  fetchListByCategory = async (categoryName) => {
    try {
      const response = await this.request(`api/providers/categories/${categoryName}`);
      if (response.message || response.error) { // check for error
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }
}
