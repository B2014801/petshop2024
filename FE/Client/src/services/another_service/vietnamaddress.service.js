import { createApiClient } from '../api.service';
class VietNamAddress {
    constructor(baseUrl = 'https://provinces.open-api.vn/api/?depth=3') {
        this.api = createApiClient(baseUrl);
    }
    async getVietNamAddress() {
        return (await this.api.get()).data;
    }
}
export default new VietNamAddress();
