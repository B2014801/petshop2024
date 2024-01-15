<template>
    <div class="mt-3 mb-4 mx-2">
        <h4 class="text-center mt-3">Voucher</h4>
        <h4 class="text-center">({{ vouchers.length }})</h4>
        <h4></h4>
        <div v-if="!action" class="text-center">
            <router-link :to="{ name: 'voucher', query: { action: 'add' } }"
                ><button class="btn btn-secondary">Thêm</button></router-link
            >
        </div>
        <Table
            v-if="!action"
            :fields="fields"
            :Data="getDataTable()"
            :fieldsMap="fieldsMap"
            categoryname="voucher"
            @deleteProduct="deleteVoucher"
        />
        <UpdateVoucherForm
            @submit:create="createVoucher"
            @submit:update="updateVoucher"
            v-if="action"
            :Add="action == 'add'"
            :voucher="voucher"
            :isShowUpdateSuccess="isShowUpdateSuccess"
            :CountUpdateProduct="CountUpdateProduct"
        />
    </div>
</template>

<script>
import UpdateVoucherForm from '@/components/form/UpdateVoucherForm.vue';
import VoucherService from '@/services/voucher.service';
import Table from '@/components/table/table.vue';
export default {
    components: {
        Table,
        UpdateVoucherForm,
    },
    data() {
        return {
            isShowForm: false,

            // fieldss,
            // studentData,
            vouchers: [],
            fields: ['STT', 'Tên', 'Giảm (%)', 'Trạng Thái', 'Hết hạn', 'Sửa'],
            fieldsMap: ['Id', 'name', 'discount', 'status', 'expired', 'edit'],
            IdOneVoucher: this.$route.params.id,
            voucher: null,
            action: this.$route.query.action,
            isShowUpdateSuccess: false,
            CountUpdateProduct: 0,
        };
    },
    methods: {
        async createVoucher(data) {
            const result = await VoucherService.create(data);
            if (result) {
                this.isShowUpdateSuccess = true;
                this.CountUpdateProduct++;
                this.getVouchers();
            }
        },
        async getVouchers() {
            this.vouchers = await VoucherService.getAll();
        },
        async getVoucher() {
            this.voucher = await VoucherService.findById(this.IdOneVoucher);
        },
        async updateVoucher(data) {
            const result = await VoucherService.update(this.IdOneVoucher, data);
            if (result) {
                this.isShowUpdateSuccess = true;
                this.CountUpdateProduct++;
                this.getVouchers();
            }
        },
        async deleteVoucher(id) {
            const result = await VoucherService.delete(id);
            if (result) {
                this.getVouchers();
            }
        },
        getDataTable() {
            let datas = [];

            this.vouchers.forEach(async (item, index) => {
                let data = {};
                data.Id = index;
                data.id = item._id;
                data.name = item.name;
                data.discount = item.discount;
                data.expired = item.expired_date;
                data.status = item.status == 'active' ? 'khả dụng' : 'không khả dụng';
                datas.push(data);
            });
            return datas;
        },
        getActionAdd() {
            if (this.$route.query.action) {
                this.action = 'add';
            }
        },
        async getActionEdit() {
            if (this.$route.query.action) {
                this.action = this.$route.query.action;
            }
            if (this.$route.params.id) {
                await this.getVoucher();
                if (this.voucher) {
                    this.action = 'edit';
                }
            } else {
                this.action = '';
            }
        },
    },
    watch: {
        '$route.query.action'(newAction) {
            // Update the action variable when the query parameter changes
            this.getActionAdd();
            this.action = newAction;
            this.CountUpdateProduct = 0;
        },
        '$route.params.id'(newAction) {
            // Update the action variable when the query parameter changes
            this.IdOneVoucher = newAction;
            this.getActionEdit();
            this.CountUpdateProduct = 0;
        },
    },
    computed: {},
    mounted() {
        document.title = 'Voucher';
        this.getVouchers();
        this.getActionEdit();
        this.getActionAdd();
    },
};
</script>

<style lang="scss" scoped></style>
