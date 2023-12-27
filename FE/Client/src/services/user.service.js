import { createApiClient } from './api.service';
class UserService {
    constructor(baseUrl = '/user') {
        this.api = createApiClient(baseUrl, true);
    }
    async getUser(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        return (await this.api.put('/update', data)).data;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new UserService();
