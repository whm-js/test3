<template>
  <div class="index">
    <x-header :left-options="{showBack: false}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">{{pagetitle}}
      <!-- <a slot="left">Close</a> -->
      <img slot="left" width="35px;" src="../assets/user.png" style="margin-top: -8px;" />
    </x-header>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <Tabbar v-model="pageindex" style="position: fixed;z-index: 100;">
      <tabbar-item link="/dsexitManage/dsexitInfo">
        <i slot="icon" class="icon iconfont icon-address_icon" />
        <span slot="label">出科管理</span>
      </tabbar-item>
      <tabbar-item link="/dsexitManage/dsguideHistory">
        <i slot="icon" class="icon iconfont icon-icon-p_dangqianmrpweidu" />
        <span slot="label">指导历史</span>
      </tabbar-item>
      <tabbar-item link="/dsexitManage/userinfo">
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
  components: {
    Tabbar,
    TabbarItem,
    XHeader
  },
  data () {
    return {
      pageindex: -1,
      pagetitle: '出科管理'
    }
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  beforeRouteUpdate (to, from, next) {
    let path = to.path
    if (path.indexOf('dsexitInfo') > -1) {
      this.pageindex = 0
      this.pagetitle = '出科管理'
    } else if (path.indexOf('dsguideHistory') > -1) {
      this.pageindex = 1
      this.pagetitle = '指导历史'
    } else if (path.indexOf('userinfo') > -1) {
      this.pageindex = 2
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
      case '/dsexitManage/userinfo':
        this.pageindex = 2
        this.pagetitle = '个人中心'
        break
      case '/dsexitManage/dsguideHistory':
        this.pageindex = 1
        this.pagetitle = '指导历史'
        break
      case '/':
        this.pageindex = 0
        this.pagetitle = '出科管理'
        this.$router.push('/dsexitManage/dsexitInfo')
        break
      default:
        this.pageindex = 0
        this.pagetitle = '出科管理'
        break
    }
    // console.log(path)
  },
  methods: {}
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  height: 100%;
}

</style>
