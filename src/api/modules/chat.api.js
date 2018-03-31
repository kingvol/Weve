import Api from '../api.base';

const resource = 'api/chat';

/**
 * @name Class UserApi
 * @extends Api
 */
export default class ChatApi extends Api {
  constructor() {
    super(resource);
  }

  fetchRooms = async (_id) => {
    try {
      const response = await this.getOne(_id);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };
}
