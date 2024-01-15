<template>
    <div class="alert-notification-container">
        <a :href="notification.url" target="_blank">
            <img :src="notification.img" /><span
                ><b> {{ ' ' + notification.name }}</b> {{ notification.title }}</span
            >
        </a>
    </div>
</template>

<script>
import { aleartNotification } from '@/stores/main.js';
export default {
    data() {
        return {
            notification: {
                url: '',
                img: '',
                name: '',
                title: '',
            },
        };
    },
    computed: {
        getNotification() {
            try {
                let AleartNotifications = aleartNotification();

                this.notification = AleartNotifications.getNotification;
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getNotification;
    },
};
</script>

<style lang="scss" scoped>
.alert-notification-container {
    img {
        border-radius: 9999px;
        object-fit: cover;
        width: 40px;
        height: 40px;
    }
}
</style>
