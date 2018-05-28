<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-search"></i>成语管理</el-breadcrumb-item>
        <el-breadcrumb-item>查看成语</el-breadcrumb-item>
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
          <el-button type="primary" @click="newChengyu()">新增成语</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table :data="chengyus" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="value" label="答案">
      </el-table-column>
      <el-table-column prop="mean" label="注解">
      </el-table-column>
      <el-table-column label="成语图片">
        <template slot-scope="scope">
          <img :src="imgUrlPre+scope.row.id+'.png?random='+Math.random()*1000" width="100" height="100"/>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="primary" @click="changeImg(scope.$index, scope.row)">上传图片</el-button>
          <el-button size="mini" type="danger" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <el-dialog
      title="新增成语"
      :visible.sync="dialogVisible"
      width="40%" center>
      <el-form ref="ruleForm" :model="ruleForm" label-width="120px" class="demo-ruleForm">
        <!-- <el-form-item label="ID" prop="id">
          <el-input v-model="ruleForm.id"></el-input>
        </el-form-item> -->
        <el-form-item label="答案" prop="value">
          <el-input v-model="ruleForm.value"></el-input>
        </el-form-item>
        <el-form-item label="注释" prop="mean">
          <el-input v-model="ruleForm.mean"></el-input>
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
        <!--<el-form-item>-->
        <!--<el-button type="primary" @click="ensureAdd('ruleForm')">确 定</el-button>-->
        <!--</el-form-item >-->
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="ensureAdd('ruleForm')">确 定</el-button>
  </span>
    </el-dialog>
    <div class="pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :page-size="pageSize" :total="total" :current-page="page">
      </el-pagination>
    </div>
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="120px" ref="editForm">
        <!-- <el-form-item label="ID" prop="id">
          <el-input  v-model="editForm.id" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="答案" prop="value">
          <el-input v-model="editForm.value" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="注解" prop="mean">
          <el-input type="textarea" v-model="editForm.mean" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
    <el-dialog title="上传图片" :visible.sync="uploadBox" :close-on-click-modal="false">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-change="newImgChange">
        <span class="addpic">添加图片</span>
        <img v-if="newUrl" :src="newUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>

      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="uploadBox = false">取消</el-button>
        <el-button type="primary" @click="uploadThis">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getIdiomList, deleteIdiom, addIdiom, uploadimg, getIdiom, updateIdiom} from '../../api/index';

  export default {
    name: "Idiom",
    data() {
      return {
        page: 1,
        size: 10,
        pageSize: 10,
        editLoading: false,
        chengyus: [],//成语列表
        currentFiltersKey: '',//查询值
        filters: {
          key: ''
        },
        //编辑界面数据
        editForm: {
          id: '',
          mean: '',
          value: ''
        },
        editFormVisible: false,//编辑界面是否显示
        listLoading: false,
        total: 0,
        dialogVisible: false,
        ruleForm: {
          id: '',
          value: '',
          mean: '',
          imageUrl: ''
        },
        idiomId: '',
        newUrl: '',
        uploadBox: false,
        fd: {}
      }
    },
    mounted() {
      this.listLoading = true;
      getIdiomList(this.page, this.size).then(res => {
        if (res.data.info == 1) {
          this.total = res.data.parms.maxSize;
          this.chengyus = res.data.parms.chengyus;
          this.listLoading = false;
          //console.log(this.chengyus);

        }
      })
    },
    methods: {
      getChengyu() {
        this.currentFiltersKey = ''
        if (this.filters.key.trim() == '') {//如果没输入直接点查询就相当于查看所有
          getIdiomList(this.page, this.size).then(res => {
            if (res.data.info == 1) {
              this.total = res.data.parms.maxSize;
              this.chengyus = res.data.parms.chengyus;
              this.listLoading = false;
            }
          })
        } else {
          this.clearData();
          this.currentFiltersKey = this.filters.key.trim();
          getIdiom(this.currentFiltersKey).then(res => {
            this.chengyus.push(res.parms.chengyu);//数据格式push进去
          })
        }
      },
      clearData() {
        this.page = 1
        this.maxSize = 0,
          this.chengyus = []
      },
      ensureAdd(formchengyu) {
        this.$refs[formchengyu].validate((valid) => {
          if (valid) {
            addIdiom(this.ruleForm.id, this.ruleForm.value, this.ruleForm.mean).then(res => {
              if (res.data.info == 1) {
                this.$message({
                  message: '新增成功',
                  type: 'success'
                })

                if (this.fd instanceof FormData) {
                  let uploadpic = {
                    id: res.data.parms.id,
                    fd: this.fd
                  }
                  uploadimg(uploadpic).then(res => {
                    console.log(uploadpic);

                    if (res.result) {
                      this.$message({
                        message: '新增成功',
                        type: 'success'
                      });
                      this.newImg = new Date().getTime();
                    } else {
                      this.$message({
                        message: res.msg + ',请重新上传图片',
                        type: 'error'
                      });
                    }
                  })
                }

              }
            })
            this.dialogVisible = false;
            getIdiomList(this.page, this.size).then(res => {
              if (res.data.info == 1) {
                this.total = res.data.parms.maxSize;
                this.chengyus = res.data.parms.chengyus;
                this.listLoading = false;

              }
            })
          }
        })
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      //检验添加的图片
      checkImg(file) {
        let index = file.name.indexOf('.')
        //console.log(file.name.slice(index+1));
        let fileType = file.name.slice(index + 1)//获取文件后缀
        let isJPG = fileType.toLowerCase() === 'jpg' || fileType === 'jpeg';
        let isPNG = fileType.toLowerCase() === 'png';
        let isGIF = fileType.toLowerCase() === 'gif';
        //let isLt2M = true;//图片大小限制
        let isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG && !isGIF) {
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
      imgChange: function (file) {
        //console.log(file)
        // 显示图片
        if (this.checkImg(file.raw)) {
          this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
          // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
          //console.log(this.imageUrl);
        }
      },
      newImgChange: function (file) {
        if (this.checkImg(file.raw)) {
          this.newUrl = URL.createObjectURL(file.raw);
          // this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
          //console.log(this.imageUrl);
        }
      },
      //上传前对图片处理
      beforeUpload(file) {
        if (this.checkImg(file)) {
          this.fd = new FormData();
          this.fd.append('file', file);
        }
        return false;
      },
      //新成语对话框
      newChengyu() {
        this.dialogVisible = true;
        this.ruleForm = {
          id: '',
          value: '',
          mean: '',
          imageUrl: ''
        };
        this.fd = {};
        if (this.$refs.ruleForm !== undefined) {
          this.$refs.ruleForm.resetFields();
        }
      },
      //分页
      handleCurrentChange(val) {
        this.page = val;
        this.listLoading = true;
        //console.log(this.imgUrlPre);
        getIdiomList(this.page, this.size).then(res => {
          if (this.page == 1) {
            this.total = res.data.parms.maxSize;
          }
          this.chengyus = res.data.parms.chengyus;
          this.listLoading = false;
        })

      },
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = JSON.parse(JSON.stringify(row))//获取行信息
      },
      //提交修改
      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              updateIdiom(this.editForm).then(res => {
                this.editLoading = false;
                if (res.result) {
                  this.editFormVisible = false
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  });
                  this.clearData()
                }
                else {
                  if (res.info != 18) {
                    res.msg = res.msg + ',请重新修改'
                  }
                  this.$message({
                    message: res.msg,
                    type: 'error'
                  });
                }


              })
            })
          }
        })
      },
      changeImg(index, row) {
        this.newUrl = '';
        console.log(row.id);
        this.idiomId = row.id;
        this.uploadBox = true;
      },
      handleDel: function (index, row) {
        console.log(row.id);
        this.$confirm('确认删除该记录吗?', '提示', {  //$confirm为JS确认框
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          //NProgress.start();
          deleteIdiom(row.id).then((res) => {
            console.log(res.data);
            this.listLoading = false;
            //NProgress.done();
            if (res.data.info == 1) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              getIdiomList(this.page, this.size).then(res => {
                if (res.data.info == 1) {
                  this.total = res.data.parms.maxSize;
                  this.chengyus = res.data.parms.chengyus;
                  this.listLoading = false;
                }

              })
            }

          });
        }).catch(() => {

        });
      },
      uploadThis() {
        console.log(this.newImg);
        if (this.fd instanceof FormData) {
          let uploadpic = {
            id: this.idiomId,
            fd: this.fd
          }
          uploadimg(uploadpic).then(res => {
            console.log(uploadpic);

            if (res.result) {
              this.$message({
                message: '上传成功',
                type: 'success'
              });
              this.uploadBox = false;
              getIdiomList(this.page, this.size).then(res => {
                if (res.data.info == 1) {
                  this.total = res.data.parms.maxSize;
                  this.chengyus = res.data.parms.chengyus;
                  this.listLoading = false;
                }
              })
              // this.newImg = new Date().getTime();
            } else {
              this.$message({
                message: res.msg + ',请重新上传图片',
                type: 'error'
              });
            }
          })
        }
      }
    }

  }
</script>

<style scoped>
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

  .addpic {
    margin-left: 60px;
    padding-right: 20px;
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
    display: inline-block;
    vertical-align: middle;
  }
</style>
