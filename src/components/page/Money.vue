<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-goods"></i>金币管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看金币</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <span>答对奖励：{{form.passGoldCoin}}</span>
      <span>提示扣除：{{form.cueGoldCoin}}</span>
      <span>分享获得：{{form.shareGoldCoin}}</span>
      <span>新用户奖励：{{form.giveGoldCoin}}</span>
      <span>点击开始奖励金币：{{form.startGoldCoin}}</span>
      <span>通关奖励：{{form.clearanceGoldCoin}}</span>
      <el-button type="primary" @click="changeMoney()">修改金币模式</el-button>
    </div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<!-- <el-form-item>
					<el-input  placeholder="ID查询" v-model="filters.key"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchMoney()">查询</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>
    <el-dialog
      title="修改金币信息"
      :visible.sync="dialogVisible"
      width="40%" center>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="答对奖励金币">
          <el-input v-model="form.passGoldCoin"></el-input>
        </el-form-item>
        <el-form-item label="提示扣除金币">
          <el-input v-model="form.cueGoldCoin"></el-input>
        </el-form-item>
        <el-form-item label="分享获得金币">
          <el-input v-model="form.shareGoldCoin"></el-input>
        </el-form-item>
        <el-form-item label="新用户奖励金币">
          <el-input v-model="form.giveGoldCoin"></el-input>
        </el-form-item>
        <el-form-item label="点击开始奖励金币">
          <el-input v-model="form.startGoldCoin"></el-input>
        </el-form-item>
        <el-form-item label="通关奖励金币">
          <el-input v-model="form.clearanceGoldCoin"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureChange()">确 定</el-button>
  </span>
    </el-dialog>
      <el-table :data="coinList" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="ID" sortable width="80">
      </el-table-column>
      <el-table-column prop="userId" label="用户id" >
      </el-table-column>
      <el-table-column prop="createTime" label="时间" :formatter="formatTime">
      </el-table-column>
      <el-table-column prop="goldCoin" label="金币">
      </el-table-column>
       <el-table-column prop="operation" label="金币来源">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger"  @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
  import {getCoin,getAllCoin,changeCoin,delCoin,getCoinModel} from '../../api/index';
  import {formatLoanTime} from '../../api/filter'

  export default {
    name: "Money",
    data() {
      return {
        page:1,
        size:10,
        pageSize:10,
        total:0,
        listLoading: false,
        coinList:[],
        currentFiltersKey:'',//查询值
        filters: {
        key: ''
        },
        //  
        dialogVisible: false,
        form: {
          passGoldCoin: null,
          cueGoldCoin: null,
          shareGoldCoin: null,
          giveGoldCoin: null,
          startGoldCoin: null,
          clearanceGoldCoin: null
        }
      }
    },
    mounted() {
      getAllCoin(this.page,this.size).then(res => {
        if(res.data.info == 1){
        this.total = res.data.parms.maxSize;
        this.coinList = res.data.parms.gold_coin_records
        // console.log(this.coinList)
        this.listLoading = false;
        }
      })
      getCoinModel(this.form).then(res => {
        //console.log(res.info);
        
          this.form = res.parms.gold_coin
          this.listLoading = false;
        
      })
    },
    methods: {
      changeMoney() {
        this.dialogVisible = true
      },
      ensureChange() {
        let passGoldCoin = this.form.passGoldCoin || 0;
        let cueGoldCoin = this.form.cueGoldCoin || 0;
        let shareGoldCoin = this.form.shareGoldCoin || 0;
        let giveGoldCoin = this.form.giveGoldCoin || 0;
        let startGoldCoin = this.form.startGoldCoin|| 0;
        let clearanceGoldCoin = this.form.clearanceGoldCoin || 0;
        changeCoin(passGoldCoin, cueGoldCoin, shareGoldCoin,giveGoldCoin,startGoldCoin,clearanceGoldCoin).then(res => {
          // console.log(res);
          if (res.data.info == 1) {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            getAllCoin(this.page,this.size).then(res => {
              // console.log(res.info);
              this.dialogVisible = false;
              this.gold_coin = res.data.parms.gold_coin
            })

          } else {
            this.$message.error('修改失败');
          }
        })
      },
      formatTime(row,column){
         return formatLoanTime(row[column.property]);
      },
      handleDel(index, row){
        this.$confirm('确认删除该记录?','提示',{
          type:'warning'
          }).then(() =>{
            this.listLoading = true
            delCoin(row.id).then(res => {
            console.log(res.data)
            this.listLoading = false;
            if (res.data.info == 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
                })
                location.reload();//刷新页面
              }
            })
        })
      //       getAllCoin(this.page,this.size).then(res => {
      //       if(res.data.info == 1){
      //       this.total = res.data.parms.maxSize;
      //       this.coinList = res.data.parms.gold_coin_records
      //        console.log('del')
      //       this.listLoading = false;
      //   }
      // })        
     },
     searchMoney(){
       this.currentFiltersKey = ''
        if(this.filters.key.trim() == ''){
         getAllCoin(this.page,this.size).then(res => {
        if(res.data.info == 1){
        this.coinList = res.data.parms.gold_coin_records
        this.listLoading = false;
           }
        })
       }else{
          this.clearData()
          this.currentFiltersKey = this.filters.key.trim();
          getCoinID(this.currentFiltersKey).then(res => {
            if(res.data.info ==1){
              this.coinList.push(res.data.parms.gold_coin_record)
            }
          })
       }
     },
      clearData(){
        this.page = 1
        this.maxSize = 0
        this.coinList = []
      },
      //分页
      handleCurrentChange(val){
        this.page = val;
        this.listLoading = true;
        getAllCoin(this.page,this.size).then(res => {
        if(res.data.info == 1){
        this.coinList = res.data.parms.gold_coin_records
        this.listLoading = false;
        }
      })
      }
    }
    
  }
</script>

<style scoped>

</style>
