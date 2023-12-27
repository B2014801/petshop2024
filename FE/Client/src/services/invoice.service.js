import { createApiClient } from './api.service';
class InvoiceService {
    constructor(baseUrl = '/invoice') {
        this.api = createApiClient(baseUrl, true);
    }
    async create(data) {
        return (await this.api.post('/', data)).data;
    }
    async getAllInvoice(state, userid) {
        return (await this.api.get(`?state=${state}&userid=${userid}`)).data;
    }
    async cancelOrder(data) {
        return (await this.api.put('/', data)).data;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new InvoiceService();
