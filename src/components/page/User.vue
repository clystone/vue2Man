<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-service"></i>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看用户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="users" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="100">
      </el-table-column>
      <el-table-column prop="heawdImgUrl" label="头像" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.headImgUrl" width="80" height="80"/>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">详情</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pageSize" :total="total" :current-page="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {getALLUser,findUserPhone,findUserId} from '../../api/index';

  export default {
    name: "User",
    data() {
      return {
        page: 1,
        size: 10,
        pageSize: 10,
        users: [],
        listLoading: false,
        total: 0
      }
    },
    mounted(){
      this.listLoading = true;
      getALLUser(this.page,this.size).then(res=>{
        console.log(res.data);
        if (res.data.info == 1) {
          this.total = res.data.parms.maxSize;
          this.users = res.data.parms.users;
          this.listLoading = false;
        }
      })
    },
    methods: {
      handleCurrentChange(val){
        this.page = val
        getALLUser(this.page,this.size).then(res=>{
        //console.log(res.data);
        if (res.data.info == 1) {
          if (this.page == 1){
            this.total = res.data.parms.maxSize;
          }
          this.users = res.data.parms.users;
          this.listLoading = false;
        }
      })
      }
    }
  }
</script>
<style scoped>

</style>
