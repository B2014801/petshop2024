<template>
    <div>
        <!-- place for containter router -->
        <!-- <button v-tippy="{ content: 'Hi!' }">Tippy!</button>
        <button v-tippy="'Hello!'">Tippy!</button> -->
        <router-view />
    </div>
</template>

<script>
import { directive } from 'vue-tippy';

export default {
    directives: {
        tippy: directive,
    },
};
</script>

<style lang="scss" module></style>
