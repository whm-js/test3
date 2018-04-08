<template>
  <div id="traningManage">
    <div class="demandlist" v-show="showleftmune">
      <!--group label-align="center">
        <template v-for="(item,index) in demandinfoData">
          <cell-box :key="index"><span style="background-color:#ccc;">{{item.name}}</span></cell-box>
          <template v-for="(itemB,indexB) in demandinfoData[index].demands">
            <div :key="indexB"><span>{{itemB.name}}</span></div>
          </template>
        </template>
      </group-->
    </div>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
import { getDemandInfo } from '@/http/data'
import { mapGetters } from 'vuex'
var that
export default {
  name: '',
  components: {
    Group,
    Cell,
    CellBox
  },
  computed: {
    ...mapGetters([
      'userLoginInfo'
    ])
  },
  data () {
    return {
      demandinfoData: {},
      name: '',
      showleftmune: true
    }
  },
  created () {
    that = this
  },
  activated () {
    getDemandInfo(this.userLoginInfo.guid).then(res => {
      that.demandinfoData = res.datas
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#traningManage{margin-top: 50px;margin-bottom: 60px;}
#traningManage .demandlist{width:60%;}
#traningManage .demandlist span{width:100%; text-align: center;}
</style>
