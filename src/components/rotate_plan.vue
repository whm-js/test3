<template>
<!-- 轮转计划页面 -->
  <div class="rotate_plan">
    <group gutter="0">
      <cell @click.native="selectPlan(item)" v-if="rotateInfoArr.plans" v-for="(item, index) in rotateInfoArr.plans" :key="`plan${index}`" :title="item.depart_name">
        <span slot="inline-desc">{{item.plan_start}}至{{item.plan_end}}
          <badge :text="`${item.plan_duration}个月`"></badge>
        </span>
        <span style="color:green;">{{item.status_code}}</span>
      </cell>
      <cell v-if="rotateInfoArr.plans" v-show="rotateInfoArr.plans.length === 0" :title="'暂无轮转记录,请联系科教科'">
      </cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Badge } from 'vux'
import { userstatistic } from '@/http/data'
import { mapGetters, mapActions } from 'vuex'
var that
export default {
  name: '',
  components: {
    Group,
    Cell,
    Badge
  },
  computed: {
    ...mapGetters([
      'userLoginInfo',
      'rotateInfoArr'
    ])
  },
  data () {
    return {
      pagetitle: '轮转科室',
      planArr: []
    }
  },
  created () {
    that = this
  },
  activated () {
    if (!this.rotateInfoArr.hasOwnProperty('id')) {
      userstatistic(this.userLoginInfo.guid, this.userLoginInfo.user.id).then(res => {
        that.setRotateInfoArr(res.datas)
      })
    }
  },
  methods: {
    ...mapActions({
      setRotateInfoArr: 'setRotateInfoArr',
      setRotateInfo: 'setRotateInfo'
    }),
    selectPlan (item) {
      this.setRotateInfo(item)
      this.$router.push('/index/rotatedepartment')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.rotate_plan {
  /* height: 100%; */
  margin-top: 45px;
  margin-bottom: 55px;
  /* margin: 0 5px; */
  background-color: white;
}
</style>
