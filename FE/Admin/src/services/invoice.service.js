import { createApiClient } from './api.service';
class Invoice {
    constructor(baseUrl = '/api/petshop/invoice') {
        this.api = createApiClient(baseUrl, true);
    }
    async getAllInvoice() {
        return (await this.api.get('/all')).data;
    }
    async updateState(data) {
        return (await this.api.put('/', data)).data;
    }
    async getRevenue() {
        return (await this.api.get('/revenue')).data;
    }
}

export default new Invoice();
