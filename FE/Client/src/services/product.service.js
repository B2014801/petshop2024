import { createApiClient } from './api.service';
class Product {
    constructor(baseUrl = '') {
        this.api = createApiClient(baseUrl, false);
    }
    async getAllProduct() {
        return (await this.api.get('/product')).data;
    }

    async getAllProductWithBrandId(id) {
        return (await this.api.get(`/product?brandId=${id}`)).data;
    }
    async findProductById(id) {
        return (await this.api.get(`/product/${id}`)).data;
    }
    async createUser(data) {
        return (await this.api.post('/auth/register', data)).data;
    }
    async login(data) {
        return (await this.api.post('/auth/login', data)).data;
    }
    async getImg(name) {
        return (await this.api.get(`/product/img/${name}`)).data;
    }
    async findByName(name) {
        return (await this.api.get(`/product/?name=${name}`)).data;
    }
    async findByNameExceptId(name, id) {
        return (await this.api.get(`/product/?name=${name}&&exceptId=${id}`)).data;
    }
    async addToCart(id, data) {
        return (await this.apiWithAuthToken.post(`/product/${id}`, data)).data;
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Product();
