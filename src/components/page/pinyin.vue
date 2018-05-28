<!--  -->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-search"></i>拼音管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看拼音</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
            <!-- <el-form-item>
                <el-input  placeholder="成语ID" v-model="filters.key"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getChengyu()">查询</el-button>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="newPinyin()">新增拼音</el-button>
            </el-form-item>
        </el-form>
	</el-col> 
    <el-table :data="pinyins" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="value" label="答案" >
      </el-table-column>
      <el-table-column prop="pinYin" label="拼音">
      </el-table-column>
      <el-table-column prop="word" label="词">
      </el-table-column>
      <el-table-column prop="wrongPinYin" label="错误读音">
      </el-table-column>  
      <el-table-column prop="goodPinYin" label="正确读音">
      </el-table-column>  
      <el-table-column prop="mean" label="词语解释">
      </el-table-column>  

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary"  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
  <!-- 新增词语界面 -->
    <el-dialog
      title="新增拼音词语"
      :visible.sync="dialogVisible"
      width="40%" center>
      <el-form ref="ruleForm" :model="ruleForm"  label-width="120px" class="demo-ruleForm">
        <!-- <el-form-item label="ID" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item> -->
        <el-form-item label="答案" prop="value">
          <el-input v-model="ruleForm.value"></el-input>
        </el-form-item>
        <el-form-item label="词语解释" prop="mean">
          <el-input v-model="ruleForm.mean" ></el-input>
        </el-form-item>
        <el-form-item label="拼音" prop="pinYin">
          <el-input v-model="ruleForm.pinYin" ></el-input>
        </el-form-item>
        <el-form-item label="词" prop="word">
          <el-input v-model="ruleForm.word" ></el-input>
        </el-form-item>
        <el-form-item label="错误读音" prop="wrongPinYin">
          <el-input v-model="ruleForm.wrongPinYin" ></el-input>
        </el-form-item>
        <el-form-item label="正确读音" prop="goodPinYin">
          <el-input v-model="ruleForm.goodPinYin" ></el-input>
        </el-form-item>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureAdd('ruleForm')">确 定</el-button>
  </span>
    </el-dialog> 
    <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form  :model="editForm" label-width="120px"  ref="editForm">
        <el-form-item label="答案" prop="mean">
          <el-input  v-model="editForm.mean" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="拼音" prop="pinYin">
          <el-input type="textarea" v-model="editForm.pinYin" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="词" prop="word">
          <el-input type="textarea" v-model="editForm.word" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="错误读音" prop="wrongPinYin">
          <el-input  v-model="editForm.wrongPinYin" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="正确读音" prop="goodPinYin">
          <el-input  v-model="editForm.goodPinYin" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="词语解释" prop="value">
          <el-input  v-model="editForm.value" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>    
  </div>
</template>

<script>
import {getAllpinyin,delPinyin,addPinyin,updatePinyin} from '../../api/index';

export default {
  data () {
    return {
        pinyins: [],
        total: 0,
        page:1,
        pageSize:10,
        size:10,
        listLoading:false,
        editLoading:false,
        dialogVisible:false,
        editFormVisible:false,
        ruleForm:{
          id: '',
          value: '',
          mean: '',
          pinYin: '',
          word: '',
          wrongPinYin: '',
          goodPinYin: ''
        },
        editForm:{
          id: '',
          value: '',
          mean: '',
          pinYin: '',
          word: '',
          wrongPinYin: '',
          goodPinYin: ''  
        },
    };
  },

  components: {},

  computed: {},

  mounted(){
    this.listLoading = true
    this.getpinyin()
  },

  methods: {
      getpinyin(){
         getAllpinyin(this.page,this.size).then(res => {
            //  console.log(res.parms);
             if (res.info == 1) {
                if(this.page == 1){
                    this.total = res.parms.maxSize.length
                }
                this.pinyins = res.parms.pin_yin_words
                this.listLoading = false  
          }
         }) 
      },
      handleEdit(index,row){
          this.editFormVisible = true;
          this.editForm = JSON.parse(JSON.stringify(row))
      },
      handleDel(index,row){
        //console.log(row.id);
        this.$confirm('确认删除该词语吗?','提示',{
            type: 'warning'
        }).then(() => {
           this.listLoading = true
           delPinyin(row.id).then((res) => {
               console.log(res.parms)
               this.listLoading = false
               if(res.info == 1) {
                 this.$message({
                   message: '删除成功',
			       type: 'success'  
                 })  
               }
           })
           setTimeout(function(){location.reload();},1000);
        })
      },
      newPinyin(){
        this.dialogVisible = true;
      },
      ensureAdd(form){
          this.$refs[form].validate((vaild) => {
              if(vaild){
                addPinyin(this.ruleForm).then(res => {
                if (res.info == 1) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })
                }else{
                this.$message({
                    message: res.msg,
                    type: 'error'
                    }) 
                  }    
                })
              }
              this.dialogVisible = false;
              setTimeout(function(){location.reload();},1000);
          })
      },
      editSubmit(){
          this.$refs.editForm.validate((vaild) => {
              if(vaild){
                this.$confirm('确认提交吗？', '提示', {}).then(() => {
                this.editLoading = true;
                updatePinyin(this.editForm).then(res => {
                  this.editLoading = false;
                  if(res.result){
                    this.editFormVisible = false
                    this.$message({
                      message: '修改成功',
                      type: 'success'
                    });
                    this.clearData()  
                  }
                  else{
                    if(res.info != 18){
                    res.msg = res.msg+',请重新修改'
                    }
                    this.$message({
                      message: res.msg ,
                      type: 'error'
                     });
                  }
                  setTimeout(function(){location.reload();},1000);
                  
                })
             })  
              }
          })
      },
      clearData(){
        this.page = 1
        this.maxSize = 0,
        this.chengyus = [] 
      },
    //分页
      handleCurrentChange(val){
          this.page = val
          this.getpinyin()
      }
  }
}

</script>
<style scoped>
</style>