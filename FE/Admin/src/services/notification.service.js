import { createApiClient } from './api.service';
class Notification {
    constructor(baseUrl = '/api/petshop/notification') {
        this.api = createApiClient(baseUrl, true);
    }
    async getAll() {
        return (await this.api.get('/')).data;
    }
}
export default new Notification();
