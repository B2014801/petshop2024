import { createApiClient } from './api.service';
class Product {
    constructor(baseUrl = '/api/petshop') {
        this.api = createApiClient(baseUrl, true);
    }
    async getAllProduct() {
        return (await this.api.get('/product')).data;
    }
    async findProductById(id) {
        return (await this.api.get(`/product/${id}`)).data;
    }
    async add(data) {
        return (await this.api.post('/product', data)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/product/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/product/${id}`)).data;
    }
}

export default new Product();
