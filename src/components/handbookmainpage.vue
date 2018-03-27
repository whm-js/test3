<template>
  <div class="handbookmainpage">
    <x-header :left-options="{backText: ''}" style="width: 100%;position: fixed;left: 0px;top: 0px;z-index: 100;">{{rotateInfo.depart_name}}
    </x-header>
    <div style="height:30px;text-align:center;border-bottom: 1px solid #999999;">轮转时间 {{rotateInfo.plan_start}} 至 {{rotateInfo.plan_end}}</div>
    <div style="height:50px;text-align:center;background-color:white;">
      <div @click="showbookpopup = true" style="width:50px;height:50px;float:left;">
        <img style="width:100%;" src="../assets/menu.png"/>
      </div>
      <div style="width:calc( 100% - 52px );height:50px;float:right;">
        <p>{{rotateMenu.menuonename}}</p>
        <p>{{rotateMenu.menutwoname}}</p>
      </div>
    </div>

    <group gutter="10">
      <swipeout v-for="(item, index) in RotateRecord" :key="`swipeout${index}`">
        <swipeout-item transition-mode="follow">
          <div slot="right-menu">
            <swipeout-button @click.native="onButtonClick('update')" style="background-color:#37acd3;color:white;">修改</swipeout-button>
            <swipeout-button @click.native="onButtonClick('delete')" type="warn">删除</swipeout-button>
          </div>
          <!-- <div slot="content">fdafdafdsafds</div> -->
          <template slot="content">
            <cell @click.native="showContent(index)" :title="`培训内容 ${item.TrainingContent}`" :key="`record${index}`" :border-intent="false">
              <span slot="inline-desc">评价：{{item.Appraise}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;培训日期：{{$dateFormat(item.TrainingDate,'YYYY-MM-DD')}}</span>
            </cell>
            <!-- <div class="slide" :class="item.showP?'animate':''" :key="`RecordContent${index}`" style="padding:0 20px;font-size: 14px;color: #999999;">
              <p style="height:24px;">
                <span style="float:left;">培训类型</span>
                <span style="float:right;">{{item.TrainingType}}</span>
              </p>
              <p style="height:24px;">
                <span style="float:left;">培训日期</span>
                <span style="float:right;">{{item.TrainingDate}}</span>
              </p>
              <p style="height:24px;">
                <span style="float:left;">学时</span>
                <span style="float:right;">{{item.Duration}}</span>
              </p>
              <p style="height:24px;">
                <span style="float:left;">主讲人</span>
                <span style="float:right;">{{item.Speaker}}</span>
              </p>
              <p style="height:24px;">
                <span style="float:left;">评价</span>
                <span style="float:right;">{{item.Appraise}}</span>
              </p>
              <p style="height:24px;">
                <span style="float:left;">备注</span>
                <span style="float:right;">{{item.Remark}}</span>
              </p>
            </div> -->
          </template>
        </swipeout-item>
      </swipeout>
    </group>

    <popup v-model="showbookpopup" position="left" width="50%" style="background-color: white;">
      <div class="menu-title">选择要求</div>
      <template v-for="(el,index) in handBookData">
        <div class="menu-tip" v-if="el.demands.length>0" :key="'demandtitle'+index">{{el.name}}</div>
        <div class="menu-tip-no" v-else :key="'demandtitleno'+index"></div>
        <ul :key="'demandnameul'+index">
          <li v-if="el.demands.length==0" @click="DemandNameClick($event,index,0)" :showDemandName="el.name" :DemandId="el.id" :TableName="el.TableFlag" :class="{active:el.Active=='in active'&&DemandNameindex==0}">
            {{el.name}}
          </li>
          <li v-else v-for="(el1,index1) in el.demands" :key="'demandname'+index1" @click="DemandNameClick($event,index,index1)" :showDemandName="el.name+'-'+el1.name" :DemandId="el1.id" :class="{active:rotateMenu.menuone===index&&rotateMenu.menutwo===index1}">
            {{el1.name}}
          </li>

        </ul>
      </template>
    </popup>
  </div>
</template>

<script>
import { XButton, Group, XHeader, XInput, Popup, Cell, Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import { mapGetters, mapActions } from 'vuex'
import { demandhandbook, getRotateRecord } from '@/http/data'
var that
export default {
  components: {
    XButton,
    Group,
    XHeader,
    XInput,
    Popup,
    Cell,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  computed: {
    ...mapGetters([
      'userLoginInfo',
      'rotateInfo',
      'rotateMenu'
    ])
  },
  data () {
    return {
      showbookpopup: false,
      handBookData: [],
      RotateRecord: [],
      handbookmenuone: 0,
      handbookmenutwo: 0
    }
  },
  created () {
    that = this
  },
  async activated () {
    let handbookArr = await demandhandbook(this.userLoginInfo.guid)
    // .then(res => {
    //   console.log(res.datas)
    //   that.handBookData = res.datas
    // })
    if (this.rotateMenu.menuonename === '') {
      this.setRotateMenu({
        menuone: 0,
        menuonename: handbookArr.datas[this.rotateMenu.menuone].name,
        menutwo: 0,
        menutwoname: handbookArr.datas[this.rotateMenu.menuone].demands[this.rotateMenu.menutwo].name
      })
    }
    this.handBookData = handbookArr.datas
    getRotateRecord(
      this.userLoginInfo.guid,
      this.userLoginInfo.user.id,
      this.rotateInfo.depart_id,
      handbookArr.datas[this.rotateMenu.menuone].demands[this.rotateMenu.menutwo].id
    ).then(res => {
      that.RotateRecord = res.datas.items
    })
  },
  methods: {
    ...mapActions({
      setRotateMenu: 'setRotateMenu',
      setRotateInfo: 'setRotateInfo'
    }),
    showContent (index) {
      if (this.RotateRecord[index].showP === true) {
        // item.showP = false
        this.$set(this.RotateRecord[index], 'showP', false)
      } else {
        // item.showP = true
        this.$set(this.RotateRecord[index], 'showP', true)
      }
      // console.log(this.RotateRecord[index].showP)
    },
    DemandNameClick (el, index, index1) {
      var menuname = el.target.getAttribute('showDemandName').split('-')
      this.setRotateMenu({ menuone: index, menuonename: menuname[0], menutwo: index1, menutwoname: menuname[1] })
      getRotateRecord(
        this.userLoginInfo.guid,
        this.userLoginInfo.user.id,
        this.rotateInfo.depart_id, el.target.getAttribute('DemandId')
      ).then(res => {
        console.log(res.datas)
        that.RotateRecord = res.datas.items
        that.showbookpopup = false
      })
    },
    onButtonClick (type) {

    }
  }
}
</script>

<style>
.handbookmainpage {
  margin-top: 50px;
  margin-bottom: 60px;
  margin-left: 5px;
  margin-right: 5px;
}

.handbookmainpage .menu-tip {
  line-height: 20px;
  color: #666;
  padding: 6px 5px;
  margin: 5px;
  font-size: 16px;
  border-left: 3px solid #37acd3;
}
.handbookmainpage .menu-tip-no {
  height: 10px;
  color: #666;
  padding: 6px 5px;
  margin: 5px;
  font-size: 16px;
}
.handbookmainpage .menu-title {
  background-color: #eee;
  text-align: center;
  font-size: 16px;
  padding: 15px;
}

.handbookmainpage li {
  list-style-type: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
  padding: 8px;
  background-color: #eee;
  margin: 5px 15px;
}
.handbookmainpage .active {
  background-color: #55d179;
  color: #fff;
}
.handbookmainpage .slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.handbookmainpage .animate {
  max-height: 9999px;
  transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
  transition-delay: 0s;
}
</style>
