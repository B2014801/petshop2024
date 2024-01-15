<template>
    <div>
        <div class="notification">
            <div @click="isShowNotification = !isShowNotification" class="notification-icon">
                <i class="fa-solid fa-bell"></i>
            </div>

            <ul v-show="isShowNotification && notifications.length != 0" class="notification-container">
                <li v-for="notification in notifications">
                    <a :href="notification.url" target="_blank">
                        <img :src="notification.img" />
                        <span>
                            <b>{{ notification.name }}</b> {{ notification.title }}
                            <p>{{ notification.date }}</p>
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        notifications: { type: Array },
    },
    data() {
        return {
            isShowNotification: false,
        };
    },
    methods: {
        handleClickOutside(event) {
            const container = this.$el.querySelector('.notification-container');
            const icon = this.$el.querySelector('.notification-icon');

            if (!container.contains(event.target) && !icon.contains(event.target)) {
                this.isShowNotification = false;
            }
        },
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
};
</script>

<style lang="scss" scoped>
.notification {
    position: relative;
    i {
        color: white;
    }
}
.notification-container {
    position: absolute;
    right: 0;
    z-index: 999;
    padding: 0px;
    color: #fff;
    background-color: rgb(83, 80, 80);
    border-radius: 8px;
    padding: 10px 2px;
    min-width: 378px;
    max-height: 80vh;
    a {
        display: flex;
        p {
            margin: 0;
            font-size: 12px;
            color: #0866ff;
        }
    }
    img {
        border-radius: 9999px;
        object-fit: cover;
        width: 40px;
        height: 40px;
    }

    li {
        display: flex;
        justify-content: space-between;
        list-style: none;
        padding: 2px 0;
        align-items: center;
        &:hover {
            background-color: #ccc;
        }
        &:not(:last-child) {
            border-bottom: 1px solid #ccc;
        }
    }
    span {
        margin-left: 4px;
    }
}
</style>
