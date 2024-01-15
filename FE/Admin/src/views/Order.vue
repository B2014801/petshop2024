<template>
    <div class="mx-2">
        <h4 class="text-center mt-3">Đơn hàng</h4>
        <h4 class="text-center m-0">({{ filteredInvoice.length }})</h4>
        <div class="invoice-filter">
            <select name="" id="" v-model="status">
                <option :value="5">Tất cả</option>
                <option :value="0">Chưa duyệt</option>
                <option :value="1">Đã duyệt</option>
                <option :value="2">Đang giao</option>
                <option :value="3">Đã giao</option>
                <option :value="4">Đã huỷ</option>
            </select>
        </div>
        <Table
            v-if="filteredInvoice.length != 0"
            :fields="fields"
            :Data="getDataTable()"
            :isOrder="true"
            :fieldsMap="fieldsMap"
        >
            <!-- one item is one order -->
            <template #orderProduct="{ field, item }">
                <div v-if="field == 'Address'">
                    <div v-if="item['Address'].phone">
                        <p class="my-1">{{ item['Address'].name }}</p>
                        <p class="my-1">{{ item['Address'].phone }}</p>
                        <p class="m-0">{{ item[field].address }}</p>
                    </div>
                    <div v-else>
                        <p>Khách hàng không còn tồn tại</p>
                    </div>
                </div>
                <div v-if="field == 'Product'">
                    <div v-for="(product, index) in item['Product']" class="order-product-containter">
                        <img :src="product.img" alt="" height="60" width="100" />

                        <span class="ms-3"
                            >{{ product.name }} <span class="ms-3">{{ product.oldprice }} ₫</span> x
                            <b>{{ product.ordernumber }}</b></span
                        >

                        <div class="order-product-notexist" v-if="product.isexist == false">
                            <!-- <h6>Sản phẩm không tồn tại</h6> -->
                        </div>
                    </div>
                    <div class="order-voucher-container">
                        <div v-if="item['vouchers'] && item['vouchers'].length != 0">
                            <div v-for="voucher in item['vouchers']" class="text-end">
                                <span class="me-3">{{ voucher.name }}</span
                                ><span>{{ voucher.discount }} %</span>
                            </div>
                        </div>
                        <div class="text-end">
                            <span>Phí vận chuyển </span>
                            <span>15.000 ₫</span>
                        </div>
                    </div>

                    <!-- <div v-if="item[field].length == 0 || product === null">
                        <p>Sản phẩm không tồn tại</p>
                    </div> -->
                </div>
                <div v-if="field == 'confirm'">
                    <button
                        @click="handleChangeStatePurchase(item._id, item.Status)"
                        :disabled="item.Status == 4 || item.Status == 3"
                        class="btn btn-secondary"
                    >
                        {{ getTitleConfirm(item.Status) }}
                    </button>
                </div>
            </template>
        </Table>
    </div>
</template>

<script>
import InvoiceService from '@/services/invoice.service';
import Table from '@/components/table/table.vue';
import io from 'socket.io-client';
export default {
    components: {
        Table,
    },
    data() {
        // const studentData = [
        //     { ID: '01', Name: 'Abiola Esther', Course: 'Computer Science', Gender: 'Female', Age: '17' },
        //     { ID: '02', Name: 'Robert V. Kratz', Course: 'Philosophy', Gender: 'Male', Age: '19' },
        //     { ID: '03', Name: 'Kristen Anderson', Course: 'Economics', Gender: 'Female', Age: '20' },
        //     { ID: '04', Name: 'Adam Simon', Course: 'Food science', Gender: 'Male', Age: '21' },
        //     { ID: '05', Name: 'Daisy Katherine', Course: 'Business studies', Gender: 'Female', Age: '22' },
        // ];
        // const fieldss = ['ID', 'Name', 'Course', 'Gender', 'Age'];
        return {
            // fieldss,
            // studentData,
            Invoices: [],
            fields: ['STT', 'Địa chỉ', 'Sản phẩm', 'Tổng cộng(₫)', 'Ngày đặt', 'Ngày giao', 'Sửa'],
            fieldsMap: ['ID', 'Address', 'Product', 'Total', 'Orderdate', 'Deliverydate', 'confirm'],
            status: 5,
        };
    },
    methods: {
        async getAllInvoice() {
            try {
                this.Invoices = await InvoiceService.getAllInvoice();
            } catch (error) {
                console.log(error);
            }
        },
        getDataTable() {
            let datas = [];

            this.filteredInvoice.forEach(async (item, index) => {
                let data = {};
                data.ID = index;
                data._id = item._id;
                data.Status = item.status;
                data.Address = { address: item.user.address, phone: item.user.phone, name: item.user.name };
                data.Product = item.detail;
                data.Orderdate = item.orderdate;
                data.Deliverydate = item.deliverydate;
                data.vouchers = item.vouchers;
                data.Total = item.total;
                datas.push(data);
            });
            return datas;
        },

        async handleChangeStatePurchase(id, status) {
            let data = {
                id: id,
                status: status,
            };
            const result = await InvoiceService.updateState(data);
            if (result) {
                this.getAllInvoice();
            }
        },
        getTitleConfirm(status) {
            let title = '';
            if (status == 0) {
                title = 'Duyệt';
            }
            if (status == 1) {
                title = 'Giao';
            }
            if (status == 2) {
                title = 'Hoàn tất';
            }
            if (status == 3) {
                title = 'Đã giao';
            }
            if (status == 4) {
                title = 'Đã huỷ';
            }

            return title;
        },
    },
    computed: {
        filteredInvoice() {
            if (this.status == 5) {
                return this.Invoices;
            } else {
                return this.Invoices.filter((invoice) => {
                    return parseInt(invoice.status) == parseInt(this.status);
                });
            }
        },
    },
    created() {
        document.title = 'Order';
        this.getAllInvoice();

        try {
            this.socket = io('http://localhost:3000');
            this.socket.on('gotNewInvoice', (invoice) => {
                this.getAllInvoice();
                console.log(1);
            });
        } catch (error) {
            console.log(error);
        }
    },
};
</script>

<style lang="scss" scoped>
.order-product-containter {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
    .order-product-notexist {
        text-align: center;

        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(114, 106, 106, 0.5);
        h6 {
            margin: 20px 0;
        }
    }
}
.order-voucher-container {
    margin-top: 2px;
    border-top: 1px solid #ccc;
    span:nth-child(2) {
        min-width: 30px;
    }
}
.invoice-filter {
    text-align: end;
    margin: 10px 0 0 0;
    select {
        height: 35px;
        border: 1px solid #ddd;
        &:focus {
            box-shadow: 0 0 3px 2px #ddd;
            outline: none;
        }
    }
}
</style>
