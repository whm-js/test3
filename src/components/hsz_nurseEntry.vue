<template>
<div class="hsz_nurseEntry">
  <div class="nurseentrynav">
    <span>计划入科时间：</span>
  </div>
  <tab active-color="#5AA9CF">
    <tab-item :selected="status==0" @on-item-click="handler">未入科</tab-item>
    <tab-item :selected="status==1000" @on-item-click="handler">已出科</tab-item>
  </tab>
  <div class="hsz_nurseentryInfo">
    <div v-if="rotateinfoList.length==0"  class="nursehtml">
      <span>暂无数据！</span>
    </div>
    <template v-for="(item,index) in rotateinfoList">
      <div class="nurseentryhtml" :key="index">
        <flexbox orient="vertical">
          <flexbox-item><div class="flex-demo">
            <span class="sp_link" @click="clickusername(item)">{{item.RealName}}({{item.UserName}})</span>
            <div v-if="item.HasNurseCertificate=='1'" class="rightY" @click="iscertificate='有'">执</div>
            <div v-else class="rightN" @click="iscertificate='无'">执</div></div></flexbox-item>
          <flexbox-item><div class="flex-demo">
            <span>计划轮转时间：{{item.PlanStartDate}}至{{item.PlanEndDate}}</span></div></flexbox-item>
          <flexbox-item><div class="flex-demo">
            <x-button type="default" @click.native="clickbutton(item)">批准入科</x-button></div></flexbox-item>
        </flexbox>
      </div>
    </template>
  </div>
</div>
</template>

<script>
import { Datetime, Tab, TabItem, Flexbox, FlexboxItem, XButton } from 'vux'
import { getRotatePlanInfo } from '@/http/data'
import { mapGetters } from 'vuex'
var that
export default {
  name: '',
  components: {
    Datetime,
    Tab,
    TabItem,
    Flexbox,
    FlexboxItem,
    XButton
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      status: 0,
      rotateinfoList: {},
      planstartdate: '',
      planenddate: ''
    }
  },
  created () {
    that = this
    var date = new Date()
    var mouth = date.getMonth() + 1
    if (mouth < 10) {
      mouth = '0' + mouth
    }
    this.planstartdate = date.getFullYear() + '-' + mouth + '-01'
  },
  activated () {
    // 进入界面，直接显示入科数据
    getRotatePlanInfo(this.userLoginInfo.guid, this.planstartdate, this.planenddate, this.status).then(res => {
      that.rotateinfoList = res.datas.items
    })
  },
  methods: {
    // 出入科数据切换,入科传0并且不传出科时间，出科传1000并且不传入科时间
    handler (index) {
      var date = new Date()
      var mouth = date.getMonth() + 1
      if (mouth < 10) {
        mouth = '0' + mouth
      }
      this.planstartdate = date.getFullYear() + '-' + mouth + '-01'
      if (index === 0) {
        this.status = 0
        getRotatePlanInfo(this.userLoginInfo.guid, this.planstartdate, this.planenddate, this.status).then(res => {
          that.rotateinfoList = res.datas.items
        })
      } else {
        this.status = 1000
        this.planstartdate = ''
        var datetime = this.getLastDay(date.getFullYear(), mouth)
        this.planenddate = date.getFullYear() + '-' + mouth + '-' + datetime
        getRotatePlanInfo(this.userLoginInfo.guid, this.planstartdate, this.planenddate, this.status).then(res => {
          that.rotateinfoList = res.datas.items
        })
      }
    },
    // 获取月份的最后一天
    getLastDay (year, month) {
      var newyear = year
      var newmonth = ++month
      if (month > 11) {
        newmonth -= 12
        newyear++
      }
      var newdate = new Date(newyear, newmonth, 1)
      return (new Date(newdate.getTime() - 1000 * 60 * 60 * 24)).getDate()
    },
    clickusername (index) {
      this.nurseinfoDetail = index
      this.shownurseinfoDetail = true
    },
    clickbutton (index) {
      console.log(index)
      this.$router.push({
        path: '/hsz_approveEntry',
        query: {
          userid: index.UserId,
          username: index.UserName,
          realname: index.RealName,
          deparmentid: index.DepartmentId,
          planstartdate: index.PlanStartDate,
          planenddate: index.PlanEndDate
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.hsz_nurseEntry{height: 100%;margin-top: 60px;padding:15px;margin-bottom: 60px;}
.hsz_nurseEntry .nurseentrynav{background-color:white;}
.hsz_nurseEntry .hsz_nurseentryInfo .nurseentryhtml{background-color:white;margin-top:20px;padding:8px;}
.hsz_nurseEntry .vux-tab{margin-top:20px;}
.nurseentryhtml button{width:35%;float:right;color: white;}
.flex-demo{width: 100%;}
.rightY{border-radius: 5px;padding: 5px;margin-right: 10px;background-color: #04be02;float: right;}
.rightN{border-radius: 5px;padding: 5px;background-color: #c0bfc4;float: right;}
.sp_link{color:rgb(55, 172, 211); text-decoration: underline;}
</style>
