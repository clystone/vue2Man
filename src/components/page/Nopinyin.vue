<!--  -->
<template>
  <div>
      <el-table :data="pinyin" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="value" label="答案" >
      </el-table-column>
      <el-table-column prop="pinYin" label="拼音">
      </el-table-column>
      <el-table-column prop="word" label="词">
      </el-table-column>
      <el-table-column prop="goodPinYin" label="正确拼音">
      </el-table-column>
      <el-table-column prop="wrongPinYin" label="错误拼音">
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
import {getNopinyin} from '../../api/index'

export default {
  data () {
    return {
        pinyin:[],
        page: 1,
        size: 10,
        pageSize: 10,
        total: 0,
        listLoading:false
    };
  },

  components: {},

  computed: {},

  mounted() {
      this.getNMPY()
  },

  methods: {
      getNMPY(){
          getNopinyin(this.page,this.size).then(res => {
            // console.log(res.parms)
            if(res.info == 1){
                if (this.page == 1) {
                this.total = res.parms.maxSize;
                }
               this.pinyin = res.parms.pin_yin_words; 
               this.listLoading = false;
            }
          })
      },
      handleCurrentChange(val){
        this.page = val;
        this.listLoading = true;
        this.getNMPY()
      }
    }
}

</script>
<style scoped>
</style>