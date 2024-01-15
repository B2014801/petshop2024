<template>
    <div>
        <Header :showCategory:="false"></Header>
    </div>
    <Main></Main>
    <Footer></Footer>
</template>
<script>
import Header from '../components/header/Header.vue';
import Main from '../components/Main.vue';
import Footer from '../components/Footer.vue';
import './globalDefaultLayoutStyle.scss';
export default {
    components: {
        Header,
        Main,
        Footer,
    },
};
</script>

<style module lang="scss">
.hi {
    color: red;
    h2 {
        color: blue;
    }
}
</style>
