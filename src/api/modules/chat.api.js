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

  createRoom = async (body) => {
    try {
      const response = await this.create(body);
      if (response.message || response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  }

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

  addMessage = async (roomId, body) => {
    try {
      const response = await this.request(`api/chat/rooms/${roomId}/messages`, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (response.error) {
        return Promise.reject(response);
      }
      return response;
    } catch ({ message }) {
      throw Error(message);
    }
  }
}
