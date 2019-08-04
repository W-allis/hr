<template>
  <div class="hr-search-tab-nav-container">
    <template v-for="(nav, index) in nav_list">
      <div :key="index" :class="{'isActive': $parent.value === nav.tabName, 'hr-search-tab-nav': true}" @click="handleTabClick(nav.tabName)">
        <slot>
          <span>{{nav.tabName}}</span>
          <i :class="[nav.icon || 'cubeic-pulldown', 'icon']" :style="nav.iconstyle"></i>
        </slot>
      </div>
    </template>
  </div>
</template>


<script>
export default {
  name: 'hr-search-tab-nav',
  props: {
    data: {}
  },
  methods: {
    handleTabClick(value) {
      this.$parent.$emit('update:value', value)
      this.$parent.$emit('after-tab-click', value)
    }
  },
  computed: {
    nav_list() {
      return this.data.map(({ tabName, icon, iconstyle }) => ({ tabName, icon, iconstyle }))
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../style/variable.less';
  .hr-search-tab-nav-container {
    font-size: 14px;
    display: flex;
    text-align: center;
    padding: 15px 0;
    background: transparent;
  }
  .hr-search-tab-nav {
    display: inline-block;
    width: 100%;
    border-right: 0.5px solid #eee;
    line-height: 20.8px;
  }
  .hr-search-tab-nav.isActive, .hr-search-tab-nav.isActive .icon {
    color: @main-color !important;
  }
  .hr-search-tab-nav:nth-last-child(1) {
    border-right: none;
  }
  .hr-search-tab-nav .icon{
    transition: transform 0.5s;
    color: #d2d2d4;
  }
  .hr-search-tab-nav.isActive .icon{
    transform: rotate(180deg);
  }
  .hr-search-tab-nav {
    flex: 1;
  }
</style>

