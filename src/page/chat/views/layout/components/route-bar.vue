<template>
  <div class="hr-route-bar-container">
    <cube-tab-bar
      v-model="defaultRoute"
      :data="asyncRoutes"
      @click="routeClick">
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      defaultRoute: '',
      asyncRoutes: [
        { label: '首页' },
        { label: '宣讲会' },
        { label: '个人中心' },
      ]
    }
  },
  methods: {
    routeClick(label) {
      console.log(label)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../style/variable.less';
  .hr-route-bar-container {
    height: @routebar-hegiht;
    line-height: @routebar-hegiht;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, .5);
    font-size: 11px;
  }
  
</style>

<style scoped>
  .hr-route-bar-container >>> .cube-tab {
    padding: 0;
  }
  .hr-route-bar-container >>> .cube-tab div {
    display: inline-block;
    line-height: 2em;
    width: 100%;
    border-right: 0.5px solid rgba(0, 0, 0, .2);
    padding: 0;
  }

  .hr-route-bar-container >>> .cube-tab:nth-last-child(1) div {
    border-right: none;
  }
</style>



