import { createApiClient } from './api.service';
class CartService {
    constructor(baseUrl = '/api/petshop/cart') {
        this.api = createApiClient(baseUrl, true);
    }

    async getCarts(id) {
        // try {
        return (await this.api.get(`/${id}`)).data;
        // } catch (error) {
        //     console.log(error);
        // }
    }
    async updateCart(id, data) {
        return (await this.api.post(`/${id}`, data)).data;
    }
    async delete(UserId, ProductId) {
        return (await this.api.delete(`/deleteOneProduct?UserId=${UserId}&ProductId=${ProductId}`)).data;
    }

    // async get(id) {
    //     return (await this.api.get(`/${id}`)).data;
    // }
}

export default new CartService();
