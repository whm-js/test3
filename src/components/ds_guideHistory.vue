<template>
  <div style="margin:55px 5px;">
    <group>
      <datetime v-model="realityEndDate" @on-change="dateChange" title="实际出科时间：" placeholder="请选择日期" @on-cancel="dateBtn('cancel')" @on-confirm="dateBtn('confirm')"></datetime>
    </group>
    <div style="margin-top:20px;">
      <group v-if="exitUserDatas.length>=1" v-for="(data, index) in exitUserDatas" :key="index">
        <cell primary="content">
          <p style="color:#37acd3;line-height: 30px;">
            <span style="float: left;text-align: left;font-weight: bold;border-bottom: 1px solid #37acd3;" @click="showPersonalInfo(data.UserId)">{{data.RealName}}（{{data.UserName}}）</span>
            <span :style="data.isZY ? 'background-color:#03b503':'background-color:#ccc;'" style="display: inline-block;width: 30px;height:30px;color:#fff;text-align:center;line-height: 30px;border-radius: 6px;">执</span>
          </p>
          <p style="clear: left;font-size: 16px;text-align: left;color:#333;line-height: 45px;">
            <span>实际轮转时间：{{data.RealityStartDate}}至{{data.RealityEndDate}}</span>
            <badge :text="'（'+data.RealityDuration+'个月）'"></badge>
          </p>
          <p style="font-size: 16px;">已出科</p>
        </cell>
      </group>
      <group v-else>
        <cell primary="content">
          <p style="font-size: 28px;text-align: center;">暂无学员出科数据！</p>
        </cell>
      </group>
    </div>
    <!--显示个人信息弹窗-->
    <div v-transfer-dom>
      <x-dialog v-model="showToast" class="dialog-demo">
        <div style="height: 550px;overflow-y: auto;overflow-x: hidden;">
          <personalInfo :personalData="personalData"></personalInfo>
        </div>
        <div @click="showToast=false">
          <span class="vux-close" style="margin: 8px 0px;"></span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Datetime, Badge, XDialog, TransferDomDirective as TransferDom } from 'vux'
import { mapGetters } from 'vuex'
import { getRotatePlanInfo, getUserInfos } from '@/http/data'
import personalInfo from '@/components/personalInfo'
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Datetime,
    Badge,
    XDialog,
    personalInfo
  },
  data () {
    return {
      showToast: false,
      realityEndDate: '',
      exitUserDatas: [],
      personalData: {}
    }
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  created () {
    // this.getRotatePlanList()
  },
  activated () {
  },
  methods: {
    // 日期控件的改变事件
    dateChange (value) {
      this.realityEndDate = value
      this.getRotatePlanList()
    },
    // 日期控件的按钮（确定、取消）事件
    dateBtn (str) {
    },
    // 获取出科列表数据
    getRotatePlanList () {
      var that = this
      // 参数顺序：guid, planstartdate 计划入科时间, planenddate 计划出科时间, rotatestatus 轮转状态, realityenddate 实际出科时间
      getRotatePlanInfo(this.userLoginInfo.guid, '', '', 200, this.realityEndDate).then(res => {
        that.exitUserDatas = res.datas.items
      })
    },
    // 获取学员个人信息弹窗
    showPersonalInfo (userId) {
      this.showToast = true
      var that = this
      getUserInfos(this.userLoginInfo.guid, userId).then(res => {
        that.personalData = res.datas
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
