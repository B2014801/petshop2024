<template>
    <div>
        <LoginForm @submit:login="handleLogin" :errorLoginEmailOrPassword="errorLoginEmailOrPassword" />
    </div>
</template>

<script>
import LoginForm from '@/components/form/LoginForm.vue';
// import PetshopService from '@/services/petshop.service';
import { mapActions } from 'pinia';
import { useAuthStore } from '@/stores/auth.store';
export default {
    components: {
        LoginForm,
    },
    data() {
        return {
            isShowErrorMessage: '',
            loading: false,
            errorLoginEmailOrPassword: false,
        };
    },
    methods: {
        ...mapActions(useAuthStore, ['login']),

        async handleLogin(user) {
            this.loading = true;

            try {
                const result = await this.login(user);
                if (result) {
                    this.$router.push({ name: 'category' });
                }
            } catch (error) {
                this.errorLoginEmailOrPassword = true;
            }
        },
    },
    created() {
        document.title = 'Login';
    },
};
</script>

<style scoped></style>
