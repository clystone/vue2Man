<!--  -->
<template>
  <div>
      <el-table :data="chengyus" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="value" label="答案" >
      </el-table-column>
      <el-table-column prop="mean" label="注解">
      </el-table-column>
      <el-table-column label="成语图片">
        <template slot-scope="scope">
          <img :src="imgUrlPre+scope.row.id+'.png'" width="100" height="100"/>
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
import {getNochengyu} from '../../api/index'

export default {
  data () {
    return {
        chengyus:[],
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
      this.getNMCY()
  },

  methods: {
      getNMCY(){
          getNochengyu(this.page,this.size).then(res => {
            //console.log(res.parms.maxSize)
            if(res.info == 1){
                if (this.page == 1) {
                this.total = res.parms.maxSize;
                }
               this.chengyus = res.parms.chengyus; 
               this.listLoading = false;
            }
          })
      },
      handleCurrentChange(val){
        this.page = val;
        this.listLoading = true;
        this.getNMCY()
      }
    }
}

</script>
<style scoped>
</style>