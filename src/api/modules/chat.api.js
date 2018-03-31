import Api from '../api.base';

const resource = 'api/chat';

/**
 * @name Class ChatApi
 * @extends Api
 */
export default class ChatApi extends Api {
  constructor() {
    super(resource);
  }

  fetchRooms = async () => {
    try {
      const response = await this.request('api/chat/rooms');
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };
}
