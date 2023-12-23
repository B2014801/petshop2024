import { createApiClient } from './api.service';
class Voucher {
    constructor(baseUrl = '/api/petshop/voucher') {
        this.api = createApiClient(baseUrl, true);
    }
    async create(data) {
        return (await this.api.post('/add', data)).data;
    }
    async getAll() {
        return (await this.api.get('/')).data;
    }
    async findById(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.post(`/update/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new Voucher();
