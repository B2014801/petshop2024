<template>
    <div>
        <button
            class="navbar-toggler"
            type="button"
            data-pos="left"
            data-toggle="collapse"
            :data-target="'#' + id_collapse"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            @click="toggleCollapse"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        id_collapse: { type: String },
    },
    methods: {
        toggleCollapse() {
            this.collapsed = !this.collapsed;
        },
    },
};
</script>

<style lang="scss" scoped></style>
