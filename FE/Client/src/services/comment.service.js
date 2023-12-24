import { createApiClient } from './api.service';
class Comment {
    constructor(baseUrl = '/comments') {
        this.api = createApiClient(baseUrl, false);
        this.apiWithAuth = createApiClient(baseUrl, true);
    }
    async getAll(product_id) {
        return (await this.api.get(`?pi=${product_id} `)).data;
    }
    async create(data) {
        return await this.apiWithAuth.post('/add', data);
    }
}
export default new Comment();
