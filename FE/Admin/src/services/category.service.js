import { createApiClient } from './api.service';
class Category {
    constructor(baseUrl = '/api/petshop/category') {
        this.api = createApiClient(baseUrl, true);
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async getAll() {
        return (await this.api.get('/')).data;
    }
    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new Category();
