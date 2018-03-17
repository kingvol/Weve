import config from '../../config';

const { backendUrl } = config;

/**
 * @name Class Api
 * @description Provides basic CRUD operations
 * @param {String(Url)} resource e.g api/users
 */

export default class Api {
  constructor(resource) {
    this.resource = resource;
    this.backendUrl = backendUrl;
  }

  create = body => fetch(`${this.backendUrl}/${this.resource}`, { method: 'POST', body }).then(raw => raw.json());

  getList = () => fetch(`${this.backendUrl}/${this.resource}`).then(raw => raw.json());

  getOne = _id => fetch(`${this.backendUrl}/${this.resource}/${_id}`).then(raw => raw.json());

  update = (_id, body) => fetch(`${this.backendUrl}/${this.resource}/${_id}`, { method: 'PATCH', body }).then(raw => raw.json());

  remove = _id => fetch(`${this.backendUrl}/${this.resource}/${_id}`, { method: 'DELETE' });

  request = (url, params) => fetch(`${this.backendUrl}/${url}`, Object.assign({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }, params)).then(raw => raw.json());
}

