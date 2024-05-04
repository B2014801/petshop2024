<template>
    <div class="news-list-container mx-2">
        <h4 class="text-center mt-3">Tin tức</h4>
        <h4 v-if="news.length > 0" class="text-center mt-0">({{  news.length }})</h4>
        <div class="text-center">
            <router-link to="/news/add"><button class="btn btn-secondary text-center">Thêm</button></router-link>
        </div>

        <Table  v-if="news.length!=0"  :Data="news" :fields="field" :fieldsMap="fieldMap" categoryname="news" @deleteProduct="handleDeleteNews">
            
        </Table>
    </div>
</template>
<script>
import NewsService from '@/services/news.service';
import Table from '@/components/table/table.vue'

export default{
    components:{
        Table
    },
    data(){
        return {
            news:[],
            field:['STT','Tiêu đề','Hình ảnh','Ngày đăng','Chi tiết'],
            fieldMap:['STT','title','img','createDate','edit']
        }
    },
    methods:{
       async getNews(){
        try {
            this.news= await NewsService.getNews()
            console.log(this.news)
            this.news.map((_,index)=>{
                this.news[index].STT=index
                this.news[index].id=_._id
            })
        } catch (error) {
        }
        },
        async handleDeleteNews(id){
            try {
             let rs=  await NewsService.deleteNews(id)
             if(rs){
                this.news=this.news.filter(item=>item._id!=id)
             }
            } catch (error) {
                
            }
        }
    }
    ,mounted(){
        this.getNews()
    }
}
</script>
<style>
.news-list-container{
    margin: 1rem 0;
}

</style>