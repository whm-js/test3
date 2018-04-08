<template>
  <div class="hsz_nurseinfolist">
      <tab active-color="#5AA9CF">
        <tab-item :selected="selectrole=='护士'" @on-item-click="handler">护士</tab-item>
        <tab-item :selected="selectrole=='护士导师'" @on-item-click="handler">导师</tab-item>
      </tab>
      <div class="hsz_nurseInfo">
        <div v-if="nurseData.length==0"  class="nursehtml">
          <span>暂无数据！</span>
        </div>
        <template v-for="(item,index) in nurseData">
          <div class="nursehtml" :key="index">
            <flexbox orient="vertical">
              <flexbox-item><div class="flex-demo">
                <span class="sp_link" @click="clickusername(item)">{{item.real_name}}({{item.user_name}})</span>
                <div v-if="item.certificate=='1'" class="rightY" @click="iscertificate='有'">执</div>
                <div v-else class="rightN" @click="iscertificate='无'">执</div></div></flexbox-item>
              <flexbox-item><div class="flex-demo">
                <span>{{item.telephone?item.telephone:'-'}}</span>
                <span class="right" v-if="item.batch=='0'">
                  年级批次：{{'-'}}
                </span>
                <span v-else class="right">年级批次：{{item.batch}}</span></div></flexbox-item>
              <flexbox-item><div class="flex-demo">
                <span class="sp_left">{{item.sex?'男':'女'}}</span>
                <span class="sp3">{{item.profession?item.profession:'-'}}</span>
                <span class="right">{{item.level?item.level:'-'}}</span></div></flexbox-item>
            </flexbox>
          </div>
        </template>
      </div>
      <x-dialog v-model="shownurseinfoDetail" class="dialog-demo" hide-on-blur>
        <div @click="shownurseinfoDetail=false">
          <span class="vux-close"></span>
        </div>
        <div class="nurseinfoDetail">
          <group label-width="8em">
            <cell class="backcolor" :title="'姓名'" :value="nurseinfoDetail.real_name"></cell>
            <cell :title="'性别'" :value="nurseinfoDetail.sex?'男':'女'"></cell>
            <cell class="backcolor" :title="'科室'" :value="nurseinfoDetail.depart_name"></cell>
            <cell :title="'护士执业证书'" :value="nurseinfoDetail.certificate?'有':'无'"></cell>
            <cell class="backcolor" :title="'学历'" :value="nurseinfoDetail.education"></cell>
            <cell :title="'参加工作时间'" :value="nurseinfoDetail.job_year"></cell>
            <cell class="backcolor" :title="'来院时间'" :value="nurseinfoDetail.join_year"></cell>
            <cell :title="'获得证书时间'" :value="nurseinfoDetail.certificate_date"></cell>
            <cell class="backcolor" :title="'取得职称时间'" :value="nurseinfoDetail.title_date"></cell>
            <cell :title="'毕业院校'" :value="nurseinfoDetail.school"></cell>
            <cell class="backcolor" :title="'毕业时间'" :value="nurseinfoDetail.graduated_year"></cell>
            <cell :title="'出生年月'" :value="nurseinfoDetail.birthday"></cell>
            <cell class="backcolor" :title="'家庭地址'" :value="nurseinfoDetail.address"></cell>
          </group>
        </div>
      </x-dialog>
  </div>
</template>

<script>
import { Tab, TabItem, Group, CellBox, Flexbox, FlexboxItem, Popover, XDialog, Cell } from 'vux'
import { getNurseInfo } from '@/http/data'
import { mapGetters } from 'vuex'
var that
export default {
  name: '',
  components: {
    Tab,
    TabItem,
    Group,
    CellBox,
    Flexbox,
    FlexboxItem,
    Popover,
    XDialog,
    Cell
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      selectrole: '护士',
      nurseData: {},
      nurseinfoDetail: [],
      shownurseinfoDetail: false
    }
  },
  created () {
    that = this
  },
  activated () {
    getNurseInfo(this.userLoginInfo.guid, this.selectrole, 1, 100000).then(res => {
      that.nurseData = res.datas.items
    })
  },
  methods: {
    handler (index) {
      if (index === 0) {
        this.selectrole = '护士'
        getNurseInfo(this.userLoginInfo.guid, this.selectrole, 1, 100000).then(res => {
          that.nurseData = res.datas.items
        })
      } else {
        this.selectrole = '护士导师'
        getNurseInfo(this.userLoginInfo.guid, this.selectrole, 1, 100000).then(res => {
          that.nurseData = res.datas.items
        })
      }
    },
    clickusername (index) {
      this.nurseinfoDetail = index
      this.shownurseinfoDetail = true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~vux/src/styles/close';
.hsz_nurseinfolist{height: 100%; margin-top: 60px;padding:15px;margin-bottom: 60px;}
.hsz_nurseinfolist tab{border-radius: 8px;}
.hsz_nurseinfolist .hsz_nurseInfo{margin-top:20px;width:100%;}
.hsz_nurseinfolist .nursehtml{background-color:white;margin-top:20px;padding:8px;}
.flex-demo{width: 100%;}
.right{float: right;padding-right: 10px;}
.sp_link{color:rgb(55, 172, 211); text-decoration: underline;}
.sp_left{width: 30%;display: inline-block;text-align: left;}
.sp3{width:30%;display: inline-block;text-align: center;}
.weui-cell{text-align: left !important;}
.backcolor{background-color: #eee;}

.rightY{border-radius: 5px;padding: 5px;margin-right: 10px;background-color: #04be02;float: right;}
.rightN{border-radius: 5px;padding: 5px;background-color: #c0bfc4;float: right;}
</style>
