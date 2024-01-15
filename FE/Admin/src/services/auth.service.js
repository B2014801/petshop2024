import { createApiClient } from './api.service';

class AuthService {
    constructor(baseUrl = '/api/petshop/auth') {
        this.api = createApiClient(baseUrl);
    }

    async createUser(data) {
        return (await this.api.post('/register', data)).data;
    }
    async login(data) {
        return (await this.api.post('/login', data)).data;
    }

    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
}

export default new AuthService();
