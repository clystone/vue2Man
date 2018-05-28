<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-star-on"></i>管理员管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-table :data="managers" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="phone" label="账号">
      </el-table-column>
      <el-table-column prop="username" label="用户名">

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          暂无
          <!--<el-button size="mini" type="primary">删除</el-button>-->
        </template>
      </el-table-column>
    </el-table>
  </div>

</template>

<script>
  import {getManager} from '../../api/index';
  export default {
    name: "Manager",
    data(){
      return{
        page: 1,
        size: 10,
        pageSize: 10,
        managers: [],
        listLoading: false,
        total: 0
      }
    },
    mounted(){
      this.listLoading = true;
      getManager(this.page,this.size).then(res=>{
        console.log(res.data);
        if(res.data.info == 1){
          this.managers = res.data.parms.managers
          this.listLoading = false;
        }
      })
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
