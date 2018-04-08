<template>
  <baidu-map class="map" :center="{lng:109.453093,lat:24.344089}" :zoom="13" :scroll-wheel-zoom="true">
    <bm-marker :position="{lng:109.453093,lat:24.344089}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
      <!-- <bm-label :content="`柳州荣兴驾校学车报名处
      地址：学院路36号1栋附近`" :labelStyle="{color: 'red', fontSize : '14px'}" :offset="{width: -35, height: 30}" /> -->
    </bm-marker>
<!-- <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation> -->
    <bm-marker :position="{lng:109.446535,lat:24.335012}" :dragging="true" animation="BMAP_ANIMATION_BOUNCE">
    </bm-marker>
    <bm-info-window :position="{lng:109.446535,lat:24.335012}" title="Info Window Title" :show="infoWindow1.show">
        <p v-text="'柳州荣兴驾校学车报名处'">万达广场</p>
        <p v-text="'地址：学院路36号1栋附近'">地址：学院路36号1栋附近</p>
        <p v-text="'联系人：罗富文'">联系人：罗富文</p>
        <p v-text="'电话:1377777777'">电话:13888888</p>
        <button>Clear</button>
      </bm-info-window>
  </baidu-map>
</template>
<script>
export default {
  data () {
    return {
      infoWindow: {
        show: true,
        contents: 'incididunt ut labore et dolore magna aliqua.'
      },
      infoWindow1: {
        show: true,
        contents: 'dunt ut labore et dolore magna aliqua.'
      },
    }
  },
  methods: {
  }
}
</script>
<style>
.map {
  width: 100%;
  height: 400px;
}
</style>
