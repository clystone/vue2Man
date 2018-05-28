<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-tickets"></i>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  
      <el-dropdown split-button type="primary" @command="handleCommand">
        {{formatTitle(status)}}
        <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="10">全部订单</el-dropdown-item>
        <el-dropdown-item command="1">等待付款的订单</el-dropdown-item>
        <el-dropdown-item command="2">付款完成的订单</el-dropdown-item>
        <el-dropdown-item command="0" >取消的订单</el-dropdown-item>
      </el-dropdown-menu>
  </el-dropdown>

   <el-table :data="orders" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="price" label="价格(元)" :formatter="pennyToYuan">
      </el-table-column>
      <el-table-column prop="createTime" label="时间" :formatter="formatTime" >
      </el-table-column>
      <el-table-column prop="orderNo" label="订单号" >
      </el-table-column>
      <el-table-column prop="payNo" label="支付单号">
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pageSize" :total="atotal" :current-page="page">
      </el-pagination>
    </div>
  </div>

</template>

<script>
  import {getOrder} from '../../api/index';
  import {formatLoanTime} from '../../api/filter'

  export default {
    name: "Order",
    data() {
      return {
        page: 1,
        size: 10,
        atotal:0 ,
        createTime:0,
        pageSize: 10, 
        orders: [],//订单号
        listLoading: false,
        status:"10",//订单默认状态
        value:'',
      }
    },
    mounted(){
      this.listLoading = true;
      this.value = 10;
      getOrder(10,this.page,this.size,this.createTime).then(res=>{
        if (res.data.info == 1) {
          this.orders = res.data.parms.orders
          this.atotal = res.data.parms.maxSize
          this.listLoading = false
        }else{
           if(res.data.info == 4){
                this.listLoading = false
                return
                }
                this.$message({
                  message: '错误信息'+res.msg,
                  type: 'error'
                }) 
        }
      })
    },
    methods:{
       handleCommand(command) {
        this.status = command;
        switch(this.status){
          case '10':getOrder(10,this.page,this.size).then(res=>{
            this.orders = []
            if (res.data.info == 1) {
              this.orders = res.data.parms.orders
              this.listLoading = false
            }else{
              if(res.data.info == 4){
                return}
                 this.$message({
                   message: '错误信息'+res.msg,
                   type: 'error'
                 }) 
            }
          });break
           case '0':getOrder(0,this.page,this.size).then(res=>{
             this.orders = []
            if (res.data.info == 1) {
              this.orders = res.data.parms.orders
              this.listLoading = false
            }else{
              if(res.data.info == 4){
                return}
                 this.$message({
                   message: '错误信息'+res.msg,
                   type: 'error'
                 }) 
            }
          });break
           case '1':getOrder(1,this.page,this.size).then(res=>{
             this.orders = []
            if (res.data.info == 1) {
              this.orders = res.data.parms.orders
              this.listLoading = false
            }else{
              if(res.data.info == 4){
                return}
                 this.$message({
                   message: '错误信息'+res.msg,
                   type: 'error'
                 }) 
            }
          });break         
           case '2':getOrder(2,this.page,this.size).then(res=>{
             this.orders = []
            if (res.data.info == 1) {
              this.orders = res.data.parms.orders
              this.listLoading = false
            }else{
              if(res.data.info == 4){
                return}
                 this.$message({
                   message: '错误信息'+res.msg,
                   type: 'error'
                 }) 
            }
          });break
        }
      },
     
      formatTitle(val){
				switch(val){
					case "10":return '全部订单';break
					case "1":return '等待付款的订单';break
					case "0":return '取消的订单';break
					case "2":return '付款完成的订单';break
				}
      },
      //单位转换，分转换为元
      pennyToYuan(row,column){
				if(!row[column.property]){
					return "未知"
				}else{
       	return (row[column.property]/100).toFixed(2)
				}
      },
      //时间转换
       formatTime(row,column){
        return formatLoanTime(row[column.property]);
    },
      //分页
      handleCurrentChange(val){
        this.page = val;
        this.listLoading = true;
        getOrder(this.status,this.page,this.size).then(res => {
          if(this.page == 1){
          this.atotal = res.data.parms.maxSize
          }
          this.orders = res.data.parms.orders
          this.listLoading = false
        })
      },
    }
  }
</script>

<style scoped>
  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
</style>
