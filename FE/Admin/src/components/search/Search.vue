<template>
    <div>
        <form @submit.prevent class="form_search">
            <div :class="['input-group p-1 rounded', classProps]">
                <input
                    class="border-0 w-100"
                    type="search"
                    placeholder="Tìm kiếm..."
                    aria-label="Search"
                    style="outline: none; width: 90%"
                    name="search_query"
                    v-model="searchQuery"
                    @input="emitSearch"
                />
            </div>
        </form>
    </div>
</template>

<script>
export default {
    props: { classProps: { type: String } },
    data() {
        return {
            searchQuery: '',
        };
    },
    methods: {
        emitSearch() {
            this.$emit('search', this.searchQuery); // Emit the search query
        },
    },
};
</script>

<style lang="scss" scoped>
.form_search {
    // m-2 bg-white border-0 rounded p-1
    margin: 8px;
    background-color: #fff;
    border-radius: 5px;
}
.input-group {
    flex-wrap: nowrap;
}
</style>
