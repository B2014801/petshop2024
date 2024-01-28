import { createApiClient } from './api.service';
class NewsService {
    constructor(baseUrl = '/news') {
        this.api = createApiClient(baseUrl);
    }
    async getNews() {
        return (await this.api.get('/')).data;
    }
    async getNewsWithId(id) {
        return (await this.api.get(`?id=${id}`)).data;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new NewsService();
