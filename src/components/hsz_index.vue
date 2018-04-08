<template>
  <div class="hsz_index">
    <x-header :left-options="{showBack: false}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">{{pagetitle}}
      <!-- <a slot="left">Close</a> -->
      <img slot="left" width="35px;" src="../assets/user.png" style="margin-top: -8px;" />
    </x-header>

    <keep-alive>
      <router-view/>
    </keep-alive>

    <Tabbar v-model="pageindex" style="position: fixed;z-index: 100;">
      <tabbar-item link="/hsz_index/hsz_nurseEntry">
        <i slot="icon" class="icon iconfont icon-icon-shuru" />
        <span slot="label">入科管理</span>
      </tabbar-item>
      <tabbar-item link="/hsz_index/hsz_nurseExit">
        <i slot="icon" class="icon iconfont icon-icon-shuchu" />
        <span slot="label">出科管理</span>
      </tabbar-item>
      <tabbar-item link="/hsz_index/hsz_nurseInfoList">
        <i slot="icon" class="icon iconfont icon-icon-p_dangqianmrpweidu" />
        <span slot="label">护士信息</span>
      </tabbar-item>
      <tabbar-item link="/hsz_index/hsz_traningManage">
        <i slot="icon" class="icon iconfont icon-duorenyonghu2" />
        <span slot="label">培训管理</span>
      </tabbar-item>
      <tabbar-item link="/index/userinfo">
        <i slot="icon" class="icon iconfont icon-my_icon" />
        <span slot="label">个人中心</span>
      </tabbar-item>
    </Tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  },
  data () {
    return {
      pageindex: -1,
      pagetitle: 'AAA'
    }
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  beforeRouteUpdate (to, from, next) {
    let path = to.path
    if (path.indexOf('hsz_nurseEntry') > -1) {
      this.pageindex = 0
      this.pagetitle = '入科管理'
    } else if (path.indexOf('hsz_nurseExit') > -1) {
      this.pageindex = 1
      this.pagetitle = '出科管理'
    } else if (path.indexOf('hsz_nurseInfoList') > -1) {
      this.pageindex = 2
      this.pagetitle = '护士信息'
    } else if (path.indexOf('hsz_traningManage') > -1) {
      this.pageindex = 3
      this.pagetitle = '培训管理'
    } else if (path.indexOf('userinfo') > -1) {
      this.pageindex = 4
      this.pagetitle = '个人中心'
    }
    next(vm => {
      // vm.selected = "";
    })
  },
  activated () {
    if (!this.userLoginInfo.hasOwnProperty('guid')) {
      this.$router.push('/login')
    }
    var path = this.$route.path
    switch (path) {
      case '/index/userinfo':
        this.pageindex = 4
        this.pagetitle = '个人中心'
        break
      case '/hsz_index/hsz_traningManage':
        this.pageindex = 3
        this.pagetitle = '培训管理'
        break
      case '/hsz_index/hsz_nurseInfoList':
        this.pageindex = 2
        this.pagetitle = '护士信息'
        break
      case '/hsz_index/hsz_nurseExit':
        this.pageindex = 1
        this.pagetitle = '出科管理'
        break
      case '/':
        this.pageindex = 0
        this.pagetitle = '入科管理'
        this.$router.push('/hsz_index/hsz_nurseEntry')
        break
      default:
        this.pageindex = 0
        this.pagetitle = '入科管理'
        break
    }
    // console.log(path)
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hsz_index {
  height: 100%;
}
/* .hsz_index .vux-header{background: rgb(55, 172, 211);} */

</style>
