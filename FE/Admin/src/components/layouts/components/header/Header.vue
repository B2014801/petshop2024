<template>
    <nav class="navbar navbar-expand-lg p-1">
        <div class="container-fluid position-relative p-0">
            <button class="navbar-toggler" type="button" @click="toggleCollapse">
                <span class="navbar-toggler-icon"></span>
            </button>
            <router-link to="/" class="mr-2">
                <img :src="images.logo" class="" alt="" width="130" height="70" />
            </router-link>
            <div v-if="showCategory" class="collapse navbar-collapse justify-content-between mr-3">
                <Category />
                <!-- <Search></Search> -->

                <div class="logout-notice">
                    <HeaderNotification :notifications="notifications.slice(0, 8)"></HeaderNotification>
                    <button @click="handleLogout" class="btn btn-light" style="font-size: ">Đăng xuất</button>
                </div>
            </div>

            <div class="d-inline text-white"></div>
        </div>
    </nav>
    <CollapseContent v-if="showCategory" :isCollapsed="isCollapsed" />
</template>
<script>
import images from '@/assets/imgs';
import Search from '@/components/search/Search.vue';
import CollapseContent from './CollapseContent.vue';
import Category from './Category.vue';
import HeaderNotification from '@/components/notification/HeaderNotification.vue';
import io from 'socket.io-client';
import AlertNotification from '@/components/notification/AlertNotification.vue';
import { useToast } from 'vue-toastification';
import { aleartNotification } from '@/stores/main.js';
import { useAuthStore } from '@/stores/auth.store.js';
import notificationService from '@/services/notification.service';
export default {
    props: {
        showCategory: { type: Boolean },
    },
    data() {
        return {
            notifications: [],
            images: images,
            isCollapsed: false,
        };
    },
    components: {
        Search,
        CollapseContent,
        Category,
        HeaderNotification,
    },
    methods: {
        toggleCollapse() {
            this.isCollapsed = !this.isCollapsed;
        },
        async getNotification() {
            try {
                this.socket = io('http://localhost:3000');
                this.socket.on('comment', (comment) => {
                    console.log(1);
                    let _comment = {
                        name: comment.user_name,
                        img: comment.user_img,
                        title: 'Đã thêm một bình luận',
                        url: comment.url + '#comment',
                    };
                    this.getNotificationFromDb();
                    let AleartNotifications = aleartNotification();
                    AleartNotifications.setNotification(_comment);
                    const toast = useToast();
                    toast.success(AlertNotification, { icon: false });
                });
                this.socket.on('gotNewInvoice', (invoice) => {
                    let _invoice = {
                        name: invoice.name,
                        img: invoice.img,
                        title: 'Đã đặt một đơn hàng',
                        url: '/order',
                    };
                    this.getNotificationFromDb();
                    let AleartNotifications = aleartNotification();
                    AleartNotifications.setNotification(_invoice);
                    const toast = useToast();
                    toast.success(AlertNotification, {
                        icon: false,
                        onClick: () => {
                            toast.clear();
                        },
                    });
                });
            } catch (error) {
                console.log(error);
            }
        },
        async getNotificationFromDb() {
            try {
                this.notifications = [];
                let result = await notificationService.getAll();
                if (result) {
                    result.map((item, index) => {
                        this.notifications.push({
                            name: item.Data.name,
                            img: item.Data.img,
                            title: item.title,
                            url: item.url,
                            date: item.date,
                        });
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async handleLogout() {
            let auth = useAuthStore();
            auth.logout();
            this.$router.push({ name: 'login' });
        },
    },
    created() {
        this.getNotificationFromDb();
        this.getNotification();
    },
};
</script>
<style lang="scss">
.nav {
    margin: 0px 10px;
}
/* @media all and (min-width: 992px) { */
.navbar .nav-item:hover .dropdown-menu {
    display: block;
}
/* } */
.nav-link,
.dropdown-item,
.nav-link-collapse {
    color: #fff !important;
    font-size: 12px;
    font-weight: 800;
    text-transform: uppercase;
}
.dropdown-menu {
    background-color: rgb(148, 233, 193);
    padding: 0;
}
.dropdown-item:hover {
    background-color: rgb(34, 101, 105) !important;
}
.dropdown-item {
    padding: 8px;
}
.dropdown-item:focus {
    background-color: rgb(156, 228, 231) !important;
}
.logout-notice {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        margin-left: 10px;
    }
}
</style>
