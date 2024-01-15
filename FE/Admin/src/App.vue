<template>
    <div>
        <component :is="currentLayout"></component>
    </div>
</template>

<script>
import defaultLayout from '@/components/layouts/defaultLayout/defaultLayout.vue';
import notCategoryLayout from '@/components/layouts/defaultLayout/notCategoryLayout.vue';

export default {
    components: {
        defaultLayout,
        notCategoryLayout,
    },
    data() {
        return {
            layout: this.$route.meta.layout,
        };
    },
    // watch: {
    //     '$route.meta.layout'(newLayout) {
    //         this.layout = newLayout;
    //     },
    // },
    computed: {
        currentLayout() {
            // Access the layout from the route's meta field
            const layout = this.$route.meta.layout || 'defaultLayout';

            // Use a conditional statement to return the appropriate layout component
            return layout === 'notCategoryLayout' ? notCategoryLayout : defaultLayout;
        },
    },
};
</script>
