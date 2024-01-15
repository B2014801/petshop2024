<template>
    <div class="page my-5 text-center">
        <p>
            Oops, không thể tìm thấy trang.
            <router-link class="text-dark" to="/"><button class="btn btn-light">Trở về trang chủ.</button></router-link>
        </p>
    </div>
</template>
<script>
export default {
    created() {
        document.title = 'Not found';
    },
};
</script>
