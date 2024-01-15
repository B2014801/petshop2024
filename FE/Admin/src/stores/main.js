import { defineStore } from 'pinia';

export const aleartNotification = defineStore('alertnotic', {
    state() {
        return {
            notification: {},
        };
    },
    getters: {
        getNotification() {
            return this.notification;
        },
    },
    actions: {
        setNotification(notification) {
            this.notification = notification;
        },
    },
});
