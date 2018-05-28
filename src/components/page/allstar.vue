<!--  -->
<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-search"></i>明星管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看明星</el-breadcrumb-item>
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
                <el-button type="primary" @click="newStar()">新增明星</el-button>
            </el-form-item>
        </el-form>
	</el-col> 
  <el-table :data="stars" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80" >
      </el-table-column>
      <el-table-column prop="remark" label="简介">
      </el-table-column>
      <el-table-column label="明星图片" width="120">
        <template slot-scope="scope">
          <img :src="imgUrlStar+scope.row.id+'.jpg'" width="100" height="100"/>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="150">
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
    <!-- 新增明星界面 -->
    <el-dialog
      title="新增明星词语"
      :visible.sync="dialogVisible"
      width="50%" center>
      <el-form ref="ruleForm" :model="ruleForm"  label-width="120px" class="demo-ruleForm">
        <!-- <el-form-item label="ID" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item> -->
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="remark" >
          <el-input v-model="ruleForm.remark" type="textarea" ></el-input>
        </el-form-item>
        <el-upload
          class="avatar-uploader"
          action=""
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeUpload"
          :on-change="imgChange">
          <span class="addpic">添加图片</span>
          <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>    
        </el-upload>
        
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureAdd('ruleForm')">确 定</el-button>
  </span>
    </el-dialog> 
     <!-- 编辑界面 -->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form  :model="editForm" label-width="120px"  ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input  v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
       <el-form-item label="简介" prop="remark" >
          <el-input type="textarea" v-model="editForm.remark" auto-complete="off" :autosize="{ minRows: 8, maxRows: 12}"></el-input>
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
import {getAllstar,addStar,uploadStarPic,delStar,updateStar} from '../../api/index';

export default {
  data () {
    return {
      stars:[],
      page: 1,
      size: 10,
      total: 0 ,
      pageSize:10,
      editLoading: false,
      listLoading: false,
      dialogVisible: false,
      editFormVisible:false,
      ruleForm: {
        name: '2',
        remark: '',
        imageUrl: ''
      },
      editForm:{
        id: '',
        name: '',
        remark: ''
      },
      fd: {}
    };
  },

  components: {},

  computed: {},

  mounted(){
    this.getStars()
  },

  methods: {
    getStars(){
      getAllstar(this.page,this.size).then(res => {
        //  console.log(res.parms)
        if(res.info == 1){
          if(this.page == 1){
          this.total = res.parms.maxSize
          }
          this.stars = res.parms.stars
          this.listLoading = false
        }
      })
    },
    newStar(){
      this.dialogVisible = true
    },
    handleEdit(index,row){
      this.editFormVisible = true
      this.editForm = JSON.parse(JSON.stringify(row))
    },
    handleDel(index,row){
      this.$confirm('确认删除该明星吗?','提示',{
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        delStar(row.id).then((res) => {
          this.listLoading = false
          if(res.info == 1){
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          }
        })
        setTimeout(function(){location.reload();},1000);
      })
    },
    editSubmit(){
      this.$confirm('确认提交修改吗?','提示',{}).then(() => {
        this.editLoading = true
        updateStar(this.editForm).then (res => {
          this.editLoading = false
          if(res.result){
            this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.editFormVisible = false
          this.clearData()
          }else{
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
    },
    clearData(){
      this.page = 1
      this.maxSize = 0,
      this.stars = [] 
    },
    ensureAdd(formStar){
      this.$refs[formStar].validate((vaild) => {
        if(vaild) {
          addStar(this.ruleForm).then(res => {
            if(res.info == 1){
              if(this.fd instanceof FormData){
                let uploadPic = {
                  id:res.parms.id,
                  fd:this.fd
                }
                uploadStarPic(uploadPic).then(res =>{
                if(res.result){
                  this.$message({
                    message: '新增成功',
                    type: 'success'
                })
                this.dialogVisible = false
                setTimeout(function(){location.reload()},1000);
              }
              this.newImg =new Date().getTime();
              })
              }
            }else{
              this.$message({
                message: res.msg,
                type: 'error'
                }) 
            }
          })
        }
      })
    },
    handleAvatarSuccess(res,file){
      this.imageUrl = URL.createObjectURL(file.raw)
    },
     //检验添加的图片
    checkImg(file){
      let index = file.name.indexOf('.')
      //console.log(file.name.slice(index+1));
      let fileType = file.name.slice(index+1)//获取文件后缀
      let isJPG = fileType.toLowerCase() === 'jpg'|| fileType === 'jpeg';
      let isPNG = fileType.toLowerCase() === 'png';
      let isGIF = fileType.toLowerCase() === 'gif';
      //let isLt2M = true;//图片大小限制
      let isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG &&!isPNG && !isGIF) {
        this.$message.error('上传头像图片只能是JPG或者PNG或者GIF格式!');
        return false;
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    //添加图片:过滤并显示
    imgChange:function(file){
      //console.log(file)
      // 显示图片
      if(this.checkImg(file.raw)){
        this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
        //console.log(this.imageUrl);
      }
    },
    //上传前对图片处理
      beforeUpload(file) {
       if(this.checkImg(file)){
        this.fd = new FormData();
        this.fd.append('file', file); 
      }
      return false;
      },
    //分页
    handleCurrentChange(val){
      this.page = val
      this.listLoading = true
      this.getStars()
    }
  }
}

</script>
<style scoped>
  .avatar-uploader{
    text-align: center;
  }
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .addpic{
      margin-left:10px;
      padding-right: 60px;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      border: 1px solid #409EFF
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>