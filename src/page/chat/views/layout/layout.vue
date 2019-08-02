<template>
  <div class="hr-layout-container">
    <!-- <cube-scroll
      ref="scroll"
      nest-mode="native"> -->
      <div class="hr-main-container">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    <!-- </cube-scroll> -->
    <hr-route-bar></hr-route-bar>
  </div>
</template>

<script>
import HrRouteBar from './components/hr-route-bar'

export default {
  components: {
    HrRouteBar
  }  
}
</script>

<style scoped>

</style>

<style lang="less" scoped>
  @import '../../style/variable.less';

  .hr-layout-container {
    padding-bottom: @routebar-height;
  }

</style>


