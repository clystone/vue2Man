<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'el-icon-search',
            title: '成语管理',
            index: '1',
            subs: [
              {
                index: 'idiom',
                title: '查看成语'
              },
              {
                index: 'NoIdiom',
                title: '未收录的成语'
              },
            ]
          },
          {
          icon: 'el-icon-search',
          title: '拼音管理',
          index: '2',
          subs: [
            {
              index: 'pinyin',
              title: '查看拼音'
            },
            {
              index: 'pinyin_Nomean',
              title: '未收录的拼音'
            },
          ]
        },    
         {
          icon: 'el-icon-search',
          title: '错别字管理',
          index: '3',
          subs: [
            {
              index: 'wrongWord',
              title: '查看错别字'
            },
            {
                index: 'wrongWord_Nomean',
                title: '未收录错别字'
            },
          ]
        },
        {
          icon: 'el-icon-search',
          title: '明星操作',
          index: '4',
          subs: [
            {
              index: 'allstar',
              title: '查看明星'
            },
            {
              index: 'allstar_Nomean',
              title: '未收录明星'
            },
          ]
        },      
          {
            icon: 'el-icon-star-on',
            title: '管理员管理',
            index: '5',
            subs: [
              {
                index: 'manager',
                title: '查看管理员'
              },
            ]
          },
          {
            icon: 'el-icon-tickets',
            title: '订单管理',
            index: '6',
            subs: [
              {
                index: 'order',
                title: '查看订单'
              },
            ]
          },
          {
            icon: 'el-icon-zoom-in',
            title: '充值卡管理',
            index: '7',
            subs: [
              {
                index: 'refillCard',
                title: '查看充值卡'
              },
            ]
          },
          {
            icon: 'el-icon-goods',
            title: '金币管理',
            index: '8',
            subs: [
              {
                index: 'money',
                title: '查看金币'
              },
            ]
          },
          {
            icon: 'el-icon-service',
            title: '用户管理',
            index: '9',
            subs: [
              {
                index: 'user',
                title: '查看用户'
              },
            ]
          },
        ]
      }
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 70px;
    bottom: 0;
    background: #2E363F;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
