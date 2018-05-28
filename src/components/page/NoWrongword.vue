<!--  -->
<template>
  <div>
      <el-table :data="wrongWord" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="value" label="答案" >
      </el-table-column>
      <el-table-column prop="level" label="等级">
      </el-table-column>
      <el-table-column prop="good" label="正确写法">
      </el-table-column>
      <el-table-column prop="bad" label="错误写法">
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
import {getNoWrongWord} from '../../api/index'

export default {
  data () {
    return {
        wrongWord:[],
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
      this.getNMWW()
  },

  methods: {
      getNMWW(){
          getNoWrongWord(this.page,this.size).then(res => {
            // console.log(res.parms)
            if(res.info == 1){
                if (this.page == 1) {
                this.total = res.parms.maxSize;
                }
               this.wrongWord = res.parms.wrong_words
               this.listLoading = false;
            }
          })
      },
      handleCurrentChange(val){
        this.page = val;
        this.listLoading = true;
        this.getNMWW()
      }
    }
}

</script>
<style scoped>
</style>