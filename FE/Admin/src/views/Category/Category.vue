<template>
    <div class="col-sm-12 col-md-6 mx-auto mt-4">
        <h4>Danh mục sản phẩm</h4>
        <strong v-if="isShowUpdateSuccess" class="update-success">Thêm thành công</strong>
        <Form :validation-schema="CategoryValidate" @submit="create">
            <table class="table table-bordered">
                <tr>
                    <td>Tên danh mục</td>
                    <td>
                        <Field type="text" name="name" class="form-control" v-model="CategoryData.name" />
                        <ErrorMessage name="name" class="text-danger" />
                    </td>
                    <td class="category-submit-btn">
                        <Button><i class="fa-solid fa-plus"></i></Button>
                    </td>
                </tr>
            </table>
        </Form>
        <Form :validation-schema="CategoryUpdateValidate" @submit="update()">
            <div class="d-flex category-update">
                <table v-if="Categorys.length" class="table table-bordered w-50">
                    <tr v-for="(category, index) in Categorys">
                        <td class="category-list">
                            <div class="flex-grow-1" @click="handleEdit(category._id)">
                                <h6 class="m-0">{{ category.name }}</h6>
                            </div>
                        </td>
                    </tr>
                </table>
                <table class="table table-bordered w-50 h-50 ms-3" v-if="isShowEditForm">
                    <tr>
                        <td class="align-self-center">
                            <h6 class="m-0">{{ nameHashEdit }}</h6>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Field type="text" name="name_update" class="form-control" v-model="CategorysToEdit.name" />
                            <ErrorMessage name="name_update" class="text-danger" />
                        </td>
                        <td class="category-submit-btn">
                            <div class="update-icon d-flex">
                                <button type="submit"><i class="fas fa-edit me-2" @click="update()"></i></button>
                                <i class="fa-solid fa-trash" @click="deleteCategory"></i>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </Form>
    </div>
</template>

<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

import CategoryService from '@/services/category.service';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    data() {
        const CategoryValidate = yup.object().shape({
            name: yup
                .string()
                .required('Nhập tên danh mục')
                .min(2, 'Tối thiểu 2 ký tự')
                .max(20, 'Tên danh mục quá dài'),
        });
        const CategoryUpdateValidate = yup.object().shape({
            name_update: yup
                .string()
                .required('Nhập tên danh mục')
                .min(2, 'Tối thiểu 2 ký tự')
                .max(20, 'Tên danh mục quá dài'),
        });
        return {
            // to create
            CategoryValidate,
            CategoryData: {
                name: '',
            },
            isShowUpdateSuccess: false,
            //get from server
            Categorys: [],
            // to edit
            isShowEditForm: false,
            CategoryUpdateValidate,
            CategorysToEdit: {
                id: '',
                name: '',
            },
            nameHashEdit: '',
        };
    },
    methods: {
        async create() {
            try {
                const result = await CategoryService.create(this.CategoryData);
                if (result) {
                    this.isShowUpdateSuccess = true;
                    this.getAll();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async getAll() {
            try {
                this.Categorys = await CategoryService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        async handleEdit(id) {
            try {
                this.isShowEditForm = true;
                this.CategorysToEdit = await CategoryService.findById(id);
                this.nameHashEdit = this.CategorysToEdit.name;
            } catch (error) {
                console.log(error);
            }
        },
        async update() {
            try {
                const result = await CategoryService.update(this.CategorysToEdit._id, this.CategorysToEdit);
                if (result) {
                    this.getAll();
                }
            } catch (error) {
                console.log(error);
            }
        },
        async deleteCategory() {
            const result = await CategoryService.delete(this.CategorysToEdit._id);
            if (result) {
                this.isShowEditForm = false;
                this.getAll();
            }
            try {
            } catch (error) {
                console.log(error);
            }
        },
    },
    mounted() {
        document.title = 'Category';
        this.getAll();
    },
};
</script>

<style lang="scss" scoped>
.category-submit-btn {
    button {
        border: 0;
        background-color: white;
    }
}
.category-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    &:hover,
    &:hover div {
        background-color: rgb(225, 245, 219);
    }
}
.category-update {
    i {
        margin: 0;
        padding: 10px;
    }
}
</style>
