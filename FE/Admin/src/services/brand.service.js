import { createApiClient } from './api.service';
class Brand {
    constructor(baseUrl = '/api/petshop') {
        this.api = createApiClient(baseUrl, true);
    }
    async getAllBrand() {
        return (await this.api.get('/brand')).data;
    }
    async findBrandById(id) {
        return (await this.api.get(`/brand/${id}`)).data;
    }
    async add(data) {
        return (await this.api.post('/brand', data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/brand/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/brand/${id}`)).data;
    }
}

export default new Brand();
