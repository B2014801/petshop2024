<template>
    <div v-if="news" v-html="news.content" class="news-detail">
    </div>
</template>

<script>
import newsService from '@/services/news.service'
    export default {
        data(){
            return {
                news:null
            }
        },
        methods:{
           async getDetail(){
                let rs= await newsService.getNewsWithId(this.$route.params.id)
                this.news=rs[0]
            },
            
        },
        mounted(){
            this.getDetail()
        }
    }
</script>

<style lang="scss" >
    .news-detail{
        margin: 1rem;
        
        img{
            width: 80vw;
            max-height: 90vh;
            object-fit: cover;
        }
    }
    .ql-align-center{
    display: flex;
    justify-content: center;
}
    
</style>