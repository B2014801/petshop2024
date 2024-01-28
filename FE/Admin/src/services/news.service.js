import { createApiClient } from './api.service';
class NewsService {
    constructor(baseUrl = '/api/petshop/news') {
        this.api = createApiClient(baseUrl, true);
    }
    async createNews(news) {
        return (await this.api.post('/', news)).data;
    }
    async getNews() {
        return (await this.api.get('/')).data;
    }
    async getNewsWithId(id) {
        return (await this.api.get(`?id=${id}`)).data;
    }
    async deleteNews(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
}
export default new NewsService();
