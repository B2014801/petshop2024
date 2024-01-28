<template>
    <div class="news-add-container">
        <Form @submit="handleSubmit" :validation-schema="NewsFormValidate">
            <div class="mb-3">
                <label for="">Tiêu đề</label>
                <Field class="form-control w-50 " name="title" type="text" placeholder="Nhập tiêu đề" v-model="news.title"/>
                <ErrorMessage name="title" class="text-danger"/>
            </div>
            <div class="mb-3">
                <label for="">Hình ảnh: &nbsp;&nbsp;</label>
                <Field type="file"  name="img" v-model="news.img"/>
                <ErrorMessage name="img" class="text-danger"/>
            </div>
        
        <quill-editor 
            ref="news" 
            :options="options" 
            toolbar="full"
            @update:content="handleChange"
        ></quill-editor>
        <div class="text-center mt-3"><button type="submit" class="btn btn-secondary ">Đăng</button></div>
    </Form>
    </div>
</template>
<script>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import * as yup from 'yup';
import {Form,Field,ErrorMessage} from 'vee-validate';

import newsService from '@/services/news.service'

export default {
  components: {
    QuillEditor,
    Form,
    Field,
    ErrorMessage
  },
  data(){
    const NewsFormValidate=yup.object().shape({
        title:yup.string().max(200,'Tiêu đề quá dài').required('Nhập tiêu đề'),
        img:yup.string().required('Chọn ảnh đại diện')
    })
    return {
        NewsFormValidate,
        options:{
            debug:'infor',
            theme:'snow'
        },
        news:{
            news:'news',
            content:'',
            title:'',
            img:'',
        }
    }
  },
  methods:{
    handleChange(){
        this.news.content= this.$refs.news.getHTML()
    },
   async handleSubmit()
    {
        try {
            const form=new FormData();
            function appendIfDefined(key, value) {
                    if (value !== undefined && value !== null) {
                        form.append(key, value);
                    }
                }
            for (const key in this.news) {
                if (this.news.hasOwnProperty(key)) {
                    appendIfDefined(key, this.news[key]);
                }
            }
            let rs= await newsService.createNews(form);
            if(rs){
                this.$router.push({path:'/news'})
            }
        } catch (error) {
            console.log(error)
        }
    }
  },

}



</script>
<style lang="scss">
    .news-add-container{
        margin: 1rem 0;/* 0.25,0,5,1,1.5 => 1, 2, 3, 4*/
        form{
            margin: 0 1rem;
        }
    }
</style>