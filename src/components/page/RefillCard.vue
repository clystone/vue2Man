<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-zoom-in"></i>充值卡管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看充值中卡</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="option-box">
      
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-input  placeholder="充值卡ID" v-model="filters.key"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="searchCard()">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button size="primary" type="primary" @click="newCard()">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
    </div>
    <el-table :data="recharge_card" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="money" label="面值" :formatter="moneyConversion">
      </el-table-column>
      <el-table-column prop="gift" label="所获金币">

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="deleteThis(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="新增充值卡"
      :visible.sync="dialogVisible"
      width="40%" center>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm">
        <el-form-item label="面值" prop="money">
          <el-input v-model="ruleForm.money"></el-input>
        </el-form-item>
        <el-form-item label="可得金币" prop="gift">
          <el-input v-model="ruleForm.gift"></el-input>
        </el-form-item>
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="ensureAdd('ruleForm')">确 定</el-button>-->
        <!--</el-form-item >-->
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureAdd('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getALLRefillCard,getRefillCard,addRefillCard,deleteRefillCard} from '../../api/index';
  import * as filter from '../../util/filters';

  export default {
    name: "RefillCard",
    data() {
      return {
        recharge_card: [],
        dialogVisible: false,
        listLoading: false,
        ruleForm: {
          money: '',
          gift: '',
        },
        currentFiltersKey:'',//查询值
        filters: {
          key: ''
        },
        rules: {
          money: [
            {required: true, message: '请输入面值', trigger: 'blur'}
          ],
          gift: [
            {required: true, message: '请输入获得金币数', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.listLoading = true;
      getALLRefillCard().then(res => {
        if (res.data.info == 1) {
          this.recharge_card = res.data.parms.recharge_card
          this.listLoading = false;
        }
      })
    },
    methods: {
      newCard() {
        this.dialogVisible = true;
        this.ruleForm = {
          money: '',
          gift: '',
        }
      },
      searchCard(){
        this.currentFiltersKey = ''
        if(this.filters.key.trim()== ''){
          getALLRefillCard().then(res => {
          if (res.data.info == 1) {
              this.recharge_card = res.data.parms.recharge_card
              this.listLoading = false;
          }
          })  
       }else{
         this.clearData();
         this.currentFiltersKey = this.filters.key.trim()
         getRefillCard(this.currentFiltersKey).then(res => {
            this.recharge_card.push(res.data.parms.recharge_card)
       }) 
       }       
      },
      clearData(){
        this.page = 1
        this.maxSize = 0,
        this.recharge_card = []
      },
      ensureAdd(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            addRefillCard(this.ruleForm.money * 100, this.ruleForm.gift).then(res => {
              if (res.data.info == 1) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                });
                getALLRefillCard().then(res => {
                  console.log(res.data);
                  if (res.data.info == 1) {
                    this.recharge_card = res.data.parms.recharge_card
                  }
                })
                this.dialogVisible = false
              } else {
                this.$message.error('新增失败');
              }
            });

          } else {
            console.log(222);
          }
        });
      },
      moneyConversion: filter.moneyConversion,
      deleteThis(row) {
        console.log(row);
        console.log(row.id);
        this.$confirm('此操作将永久删除该充值卡, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteRefillCard(row.id).then(res => {
            console.log(res.data);
            if (res.data.info == 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              getALLRefillCard().then(res => {
                console.log(res.data);
                if (res.data.info == 1) {
                  this.recharge_card = res.data.parms.recharge_card
                  this.listLoading = false;
                }
              })
            } else {
              this.$message({
                type: 'info',
                message: '删除失败!'
              });
            }
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
  }
</script>

<style scoped>
  .option-box {
    margin-bottom: 20px;
  }
</style>
