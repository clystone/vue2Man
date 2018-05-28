<!--  -->
<template>
  <div>
      <el-table :data="stars" border style="width: 100%" v-loading="listLoading" class="mt10">
      <el-table-column prop="id" label="id" sortable width="80">
      </el-table-column>
      <el-table-column prop="name" label="明星" >
      </el-table-column>
      <el-table-column prop="remark" label="介绍">
      </el-table-column>
      <el-table-column label="成语图片">
        <template slot-scope="scope">
          <img :src="imgUrlStar+scope.row.id+'.jpg'" width="100" height="100"/>
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
import {getNoStar} from '../../api/index'

export default {
  data () {
    return {
        stars:[],
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
      this.getNMstar()
  },

  methods: {
      getNMstar(){
          getNoStar(this.page,this.size).then(res => {
            // console.log(res.parms)
            if(res.info == 1){
                if (this.page == 1) {
                this.total = res.parms.maxSize;
                }
               this.stars = res.parms.stars; 
               this.listLoading = false;
            }
          })
      },
      handleCurrentChange(val){
        this.page = val;
        this.listLoading = true;
        this.getNMstar()
      }
    }
}

</script>
<style scoped>
</style>