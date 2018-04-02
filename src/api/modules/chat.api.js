import Api from '../api.base';

const resource = 'api/chat/rooms';

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
      const response = await this.getList();
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  };

  fetchRoom = async (id) => {
    try {
      const response = await this.getOne(id);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  }

  fetchRoomMessages = async (id) => {
    try {
      const response = await this.request(`api/chat/rooms/${id}/messages`);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  }
}
