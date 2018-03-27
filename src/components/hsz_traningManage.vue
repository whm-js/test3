<template>
  <div id="traningManage">
    <div class="demandlist" v-show="showleftmune">
      <group label-align="center">
        <template v-for="(item,index) in demandinfoData">
          <cell-box><span style="background-color:#ccc;">{{item.name}}</span></cell-box>
          <template v-for="itemB in demandinfoData[index].demands">
            <cell-box><span>{{itemB.name}}</span></cell-box>
          </template>
        </template>
      </group>



      <!--template v-for="(item,index) in demandinfoData">
        <group label-align="center">
          <cell-box><span>{{item.name}}</span></cell-box>
          <template v-for="itemB in demandinfoData[index].demands">
            <group class="groupB" label-align="center">
              <cell-box>{{itemB.name}}</cell-box>
            </group>
          </template>
        </group>
      </template-->
      <!--group>
        <cell-box>{{demandinfoData[0].name}}</cell-box>
        <template v-for="item in demandinfoData[0].demands">
            <cell-box>{{item.name}}</cell-box>
          </template>
      </group>
        <cell-box>{{demandinfoData[1].name}}</cell-box>
        <template v-for="item in demandinfoData[1].demands">
            <cell-box>{{item.name}}</cell-box>
          </template-->
    </div>
  </div>
</template>

<script>
import { Group, Cell, CellBox } from 'vux'
import { getDemandInfo } from '@/http/data'
import { mapGetters } from 'vuex'
import { truncate } from 'fs';
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
      showleftmune: true,
    }
  },
  created () {
    that=this;
  },
  activated(){
    getDemandInfo(this.userLoginInfo.guid).then(res=>{
        that.demandinfoData=res.datas
        console.log(that.demandinfoData);
      });
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#traningManage{margin-top: 50px;margin-bottom: 60px;}
#traningManage .demandlist{width:60%;}
#traningManage .demandlist span{width:100%; text-align: center;}
</style>
