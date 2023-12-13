import { createApiClient } from './api.service';
class Product {
    constructor(baseUrl = '/') {
        this.api = createApiClient(baseUrl, false);
    }
    async getAllProduct() {
        return (await this.api.get('product')).data;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Product();
