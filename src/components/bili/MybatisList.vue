<template>
    <el-form ref="searchObjRef" style="max-width: 600px" :model="searchObj" status-icon :rules="rules"
        label-width="auto" class="demo-ruleForm">
        <el-form-item label="Age" prop="age">
            <el-input v-model="searchObj.name" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm(searchObjRef)">Submit</el-button>
            <el-button @click="resetForm(searchObjRef)">Reset</el-button>
        </el-form-item>
    </el-form>


    <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="url" label="url" width="400" />
        <el-table-column prop="view" label="view" width="100"/>
        <el-table-column prop="bvid" label="bvid" width="200"/>
        <el-table-column prop="part" label="part" width="400" />
        <el-table-column prop="page" label="page" width="100"/>
        <el-table-column prop="cid" label="cid" width="100"/>
        <el-table-column prop="duration" label="duration" width="100" />
    </el-table>

    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
        :small="small" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />

</template>

<script setup>

import { reactive, ref } from 'vue'

import api from '@/api/bili/bili'

const searchObjRef = ref()

let total = ref()

let tableData = ref([])

let currentPage4 = ref(1)
let pageSize4 = ref(10)

function fetchData() {
    //ajax
    api.getPageList(searchObj.value, currentPage4.value, pageSize4.value)
        .then(response => {
            //this.listLoading = false
            console.log(response)
            //每页数据列表
            tableData.value = response.data.records


            //总记录数
            total.value = response.data.total

            console.log(response.data.records)
            console.log(response.data.total)

            console.log(tableData)
            console.log(total)
        }
        )
}



let searchObj = ref({
    name: '',
    mid: '',
    bvid: '',
    part: '',
})


const submitForm = () => {
    fetchData()
}

// const resetForm = (formEl: FormInstance | undefined) => {
//     if (!formEl) return
//     formEl.resetFields()
// }


const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
    console.log(`${val} items per page`)
}
const handleCurrentChange = (val) => {
    console.log(`current page: ${val}`)
}

</script>