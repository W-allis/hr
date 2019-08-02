<template>
  <div class="hr-route-bar-container">
    <cube-tab-bar
      v-model="defaultRoute"
      @click="routeClick">
      <cube-tab v-for="(item, index) in asyncRoutes" :label="item.label" :value="item.path" :key="index">
        {{item.label}}
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      defaultRoute: '首页',
      asyncRoutes: [
        { label: '首页', path: '/degree' },
        { label: '宣讲会', path: '/teach-in' },
        { label: '个人中心', path: '/person' },
      ]
    }
  },
  methods: {
    routeClick(path) {
      // console.log(label)
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../../style/variable.less';
  .hr-route-bar-container {
    height: @routebar-height;
    line-height: @routebar-height;
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0px 5px 5px 1px rgba(0, 0, 0, .5);
    font-size: 11px;
    background: #fff;
    z-index: 999;
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



