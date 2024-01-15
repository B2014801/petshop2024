<template>
    <div v-if="isShowSuccessMessage" class="mt-2 text-center">
        <strong class="success-create-account">Đăng ký thành công tiến hành đăng nhập</strong>
    </div>
    <div>
        <CreateAccountForm @create:account="createUser" />
    </div>
</template>

<script>
import CreateAccountForm from '@/components/form/CreateAccountForm.vue';
import ProductService from '@/services/product.service';
export default {
    components: {
        CreateAccountForm,
    },
    data() {
        return {
            accounts: [],
            isShowSuccessMessage: false,
        };
    },
    methods: {
        async createUser(data) {
            try {
                const result = await ProductService.createUser(data);
                if (result) {
                    this.isShowSuccessMessage = !this.isShowSuccessMessage;
                    alert('thành công');
                    this.goToLogin();
                }
            } catch (error) {
                this.isShowSuccessMessage = false;
            }
        },
        async goToLogin() {
            this.$router.push({ name: 'login' });
        },
    },
};
</script>

<style lang="scss" scoped>
.success-create-account {
    color: #37e32a;
}
</style>
