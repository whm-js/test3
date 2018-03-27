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
      <tabbar-item link="/index/rotatedepartment">
        <i slot="icon" class="icon iconfont icon-address_icon" />
        <span slot="label">轮转科室</span>
      </tabbar-item>
      <tabbar-item link="/index/rotateplan">
        <i slot="icon" class="icon iconfont icon-icon-p_dangqianmrpweidu" />
        <span slot="label">轮转计划</span>
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
      pagetitle: '轮转科室'
    }
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  beforeRouteUpdate (to, from, next) {
    let path = to.path
    if (path.indexOf('rotatedepartment') > -1) {
      this.pageindex = 0
      this.pagetitle = '轮转科室'
    } else if (path.indexOf('rotateplan') > -1) {
      this.pageindex = 1
      this.pagetitle = '轮转计划'
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
      case '/index/userinfo':
        this.pageindex = 2
        this.pagetitle = '个人中心'
        break
      case '/index/rotateplan':
        this.pageindex = 1
        this.pagetitle = '轮转计划'
        break
      case '/':
        this.pageindex = 0
        this.pagetitle = '轮转科室'
        this.$router.push('/index/rotatedepartment')
        break
      default:
        this.pageindex = 0
        this.pagetitle = '轮转科室'
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
.index {
  height: 100%;
}
</style>
