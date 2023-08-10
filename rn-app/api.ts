import config from './config';

class Api {
  private async get(endpoint: string) {
    try {
      const response = await fetch(`${config.apiUrl}${endpoint}`);
      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  private async post(endpoint: string, params: any) {
    try {
      const response = await fetch(`${config.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
      return [];
    }
  }

  async updateUser(params: any) {
    const user = await this.post('/users', params);
    console.log(user);
  }

  subscribe(userId: string, params: any) {
    return this.post(`/users/${userId}/subscribe`, params);
  }

  unsubscribe(userId: string, params: any) {
    return this.post(`/users/${userId}/unsubscribe`, params);
  }
}

export default new Api();
