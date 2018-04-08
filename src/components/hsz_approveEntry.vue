<template>
<div class="hsz_approveEntry">
  <x-header>确认入科</x-header>
  <div style="margin-top:30px;border:none;">
    <div style="text-align:center;background-color:#eee;">
      <img src="../assets/user.png" />
      <div>{{realname}}({{username}})</div>
      <div>计划轮转时间：{{planstartdate}}至{{planenddate}}</div>
    </div>
  </div>
  <group gutter="0">
    <cell :title="'实际入科时间'"></cell>
    <cell :title="'导师'">
      <selector ref="defaultValueRef" title="请选择导师" :options="list" v-model="defaultValue"></selector>
    </cell>
  </group>
</div>
</template>

<script>
import { XHeader, Group, Cell, Selector } from 'vux'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    XHeader,
    Group,
    Cell,
    Selector
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      deparmentid: 0,
      userid: 0,
      username: '',
      realname: '',
      planstartdate: '',
      planenddate: '',
      realitystartdate: '',
      coachingid: 0,
      coachingname: '',
      defaultValue: 'gd',
      list: [{key: 'gd', value: '广东'}, {key: 'gx', value: '广西'}]
    }
  },
  methods: {
    getParams () {
      this.deparmentid = this.$route.query.deparmentid
      this.userid = this.$route.query.userid
      this.username = this.$route.query.username
      this.realname = this.$route.query.realname
      this.planstartdate = this.$route.query.planstartdate
      this.planenddate = this.$route.query.planenddate
      console.log(this.$route.query)
    }
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': 'getParams'
  }
}
</script>

<style lang="less" scoped>
.hsz_approveEntry .vux-header{background: rgb(55, 172, 211);}
</style>
