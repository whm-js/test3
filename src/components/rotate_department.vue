<template>
<!-- 轮转科室页面 -->
  <div class="rotate_department">

    <div style="height:110px;padding:10px 10px;border-radius:5px;background-color:white;">
      <x-button @click.native="selectdepartment" plain>{{rotateInfo.depart_name||'选择科室'}}</x-button>
      <div style="margin-top:30px;">
        <span style="margin-top:10px;">{{rotateInfo.plan_start}} 至 {{rotateInfo.plan_end}}</span>
        <span class="btn-warning">{{rotateInfo.plan_duration}}个月</span>
      </div>
    </div>

    <group style="padding:0 5px;border-radius:5px;background-color:white;">
      <cell :title="'实际时间'">
        <span>
          <span style="vertical-align:middle;">{{rotateInfo.reality_start}} 至 {{rotateInfo.reality_end}}</span>
          <badge :text="`${rotateInfo.reality_duration}个月`"></badge>
        </span>
      </cell>
      <cell :title="'带教老师'" :value="rotateInfo.coaching_name"></cell>
      <cell :title="'轮转状态'" :value="rotateInfo.status_code"></cell>
    </group>

    <div style="margin-top:20px;">
      <x-button @click.native="applyexit" v-show="rotateInfo.status!==0" style="width:45%;float:left;">{{rotateInfo.status===100?'申请出科':'出科情况'}}</x-button>
      <x-button @click.native="showhandbook" style="width:45%;float:right;margin:0;">轮转手册</x-button>
    </div>

    <div>
      <popup v-model="showdepartment" position="top" height="80%" :show-mask="true">
        <div class="position-vertical-demo">
          <group gutter="0">
            <cell @click.native="selectPlan(item)" v-if="rotateInfoArr.plans" v-for="(item, index) in rotateInfoArr.plans" :key="`plan${index}`" :title="item.depart_name">
              <span slot="inline-desc">{{item.plan_start}}至{{item.plan_end}}
                <badge :text="`${item.plan_duration}个月`"></badge>
              </span>
              <span style="color:green;">{{item.status_code}}</span>
            </cell>
            <cell v-show="rotateInfoArr.plans.length === 0" v-if="rotateInfoArr.plans" :title="'暂无轮转记录,请联系科教科'">
            </cell>
          </group>
        </div>
      </popup>
    </div>

  </div>
</template>

<script>
import { Popup, XButton, Group, Cell, Badge } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { userstatistic } from '@/http/data'
var that
export default {
  name: '',
  components: {
    Popup,
    XButton,
    Group,
    Cell,
    Badge
  },
  computed: {
    ...mapGetters([
      'userLoginInfo',
      'rotateInfoArr',
      'rotateInfo'
    ])
  },
  data () {
    return {
      showdepartment: false,
      pagetitle: '轮转科室',
      planArr: {},
      planIndex: -1,
      planData: {}
    }
  },
  // 页面创建时
  created () {
    that = this
  },
  // 页面激活时
  activated () {
    if (!this.rotateInfoArr.hasOwnProperty('id')) {
      userstatistic(this.userLoginInfo.guid, this.userLoginInfo.user.id).then(res => {
        that.planArr = res.datas
        that.setRotateInfoArr(res.datas)
        // console.log(this.rotateInfoArr)
        // console.log(that.planArr)
        if (this.rotateInfoArr.plans.length === 0) {
          this.$vux.toast.text('暂无轮转计划,请联系科教科', 'top')
          return
        }
        if (!this.rotateInfo.hasOwnProperty('depart_id')) {
          this.showPlanData()
        }
      })
    } else {
      if (this.rotateInfoArr.plans.length === 0) {
        this.$vux.toast.text('暂无轮转计划,请联系科教科', 'top')
        return
      }
      if (!this.rotateInfo.hasOwnProperty('depart_id')) {
        this.showPlanData()
      }
    }
  },
  methods: {
    ...mapActions({
      setRotateInfoArr: 'setRotateInfoArr',
      setRotateInfo: 'setRotateInfo'
    }),
    selectdepartment () {
      if (this.rotateInfoArr.plans.length === 0) {
        this.$vux.toast.text('暂无轮转计划,请联系科教科', 'top')
        return
      }
      this.showdepartment = true
    },
    applyexit () {
      this.$router.push('/bmap')
      // this.$router.push('/nurseexit')
    },
    showPlanData () {
      for (let i = 0; i < this.rotateInfoArr.plans.length; i++) {
        if (this.rotateInfoArr.plans[i].status === '已出科') {
          this.planIndex = i
        }
      }
      if (this.planIndex === -1) {
        this.planIndex = 0
      }
      console.log(this.planIndex)
      this.planData = this.rotateInfoArr.plans[this.planIndex]
      this.setRotateInfo(this.planData)
    },
    selectPlan (item) {
      this.planData = item
      this.setRotateInfo(item)
      this.showdepartment = false
      // console.log(item)
    },
    showhandbook () {
      this.$router.push('/handbookmainpage')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.rotate_department {
  /* height: 100%; */
  margin-top: 55px;
  margin-bottom: 55px;
  margin-left: 5px;
  margin-right: 5px;
  /* margin: 0 5px; */
}
.btn-warning {
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
  padding: 3px 10px;
  font-size: 14px;
  border-radius: 5px;
  margin-left: 20px;
}
</style>
