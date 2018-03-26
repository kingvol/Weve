import Api from '../api.base';

const resource = 'api/categories';

/**
 * @name Class CategoryApi
 * @extends Api
 */
export default class CategoryApi extends Api {
  constructor() {
    super(resource);
  }

  fetchCategoriesList = async () => {
    try {
      const response = await this.getList();
      if (response.message || response.error) { // check for error
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) { throw Error(message); }
  }
}
