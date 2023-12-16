import { createApiClient } from './api.service';
class Category {
    constructor(baseUrl = '') {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get('/category')).data;
    }
    // async getAllBrand(id) {
    //     return (await this.api.get(`/brand?categoryId=${id}`)).data;
    // }
}
export default new Category();
