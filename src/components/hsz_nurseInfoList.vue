<template>
  <div class="hsz_nurseinfolist">
      <tab active-color="#5AA9CF">
        <tab-item :selected="selectrole=='护士'" @on-item-click="handler">护士</tab-item>
        <tab-item :selected="selectrole=='护士导师'" @on-item-click="handler">导师</tab-item>
      </tab>
      <div class="hsz_nurseInfo">
          <template v-for="item in nurseData">
            <group>
                <cell-box>
                  <flexbox orient="vertical">
                      <flexbox-item><div class="flex-demo">
                        <span class="sp_link">{{item.real_name}}({{item.user_name}})</span>
                        <div class="right">执</div>
                        <!--span class="right">{{item.certificate?'有':'无'}}</span--></div></flexbox-item>
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
                </cell-box>
            </group>
          </template>
      </div>
  </div>
</template>

<script>
import { Tab, TabItem, Group, CellBox, Flexbox, FlexboxItem } from 'vux'
import { userLogin, getNurseInfo } from '@/http/data'
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
    FlexboxItem
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      demo01:0,
      selectrole : '护士',
      nurseData: {},
    }
  },
  created () {
    that = this
  },
  activated () {
    console.log(that.selectrole)
    getNurseInfo(this.userLoginInfo.guid,this.selectrole,1,100000).then(res=>{
      that.nurseData=res.datas.items
    })
  },
  methods: {
    handler(index){
      console.log(`index is ${index}`)
      if(index==0){
        that.selectrole='护士'
        getNurseInfo(this.userLoginInfo.guid,this.selectrole,1,100000).then(res=>{
          that.nurseData=res.datas.items
        })
      }else{
        that.selectrole='护士导师'
        getNurseInfo(this.userLoginInfo.guid,this.selectrole,1,100000).then(res=>{
          that.nurseData=res.datas.items
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.hsz_nurseinfolist{height: 100%; margin-top: 60px;padding:15px;margin-bottom: 60px;}
.hsz_nurseinfolist tab{border-radius: 8px;}
.hsz_nurseinfolist .hsz_nurseInfo{margin-top:20px;width:100%;}
.flex-demo{width: 100%;}
.right{float: right;padding-right: 15px;}
.sp_link{color:rgb(55, 172, 211); text-decoration: underline;}
.sp_left{width: 30%;display: inline-block;text-align: left;}
.sp3{width:30%;display: inline-block;text-align: center;}
</style>
