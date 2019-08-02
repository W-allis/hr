<template>
  <div class="hr-search-tab-container" :style="initstyle">
    <div class="hr-search-tab-nav" :style="navstyle">
      <hr-search-tab-nav :data="panes">
        <template v-slot="{ row }">
          <slot name="header" :row="row"></slot>
        </template>
      </hr-search-tab-nav>
    </div>
    <div class="hr-search-tab-content" :style="contentstyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hr-search-tab',
  props: {
    hideContent: {
      type: Boolean,
      default: true
    },
    value: {},
    initstyle: {},
    navstyle: {},
    iconstyle: {},
    contentstyle: {}
  },
  created() {
    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true))
  },
  mounted() {
    this.calcPaneInstances()
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },
  data() {
    return {
      panes: []
    }
  },
  methods: {
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag &&
          vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'hr-search-tab-item')
      //   // update indeed
        const panes = paneSlots.map(({ componentInstance }) => componentInstance)
        const panesChanged = !(panes.length === this.panes.length && panes.every((pane, index) => pane === this.panes[index]))
        if (isForceUpdate || panesChanged) {
          this.panes = panes
        }
      } else if (this.panes.length !== 0) {
        this.panes = []
      }
    }
  }
}
</script>

<style scoped>
  .hr-search-tab-container {
    box-shadow: 0 4px 13px 0 rgba(110, 119, 139, .14);
    z-index: 999;
    position: relative;
  }
  .hr-search-tab-nav {
    box-shadow: 0 4px 13px 0 rgba(110, 119, 139, .14);
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    z-index: 1002;
    background: #fff;
    /* margin-bottom: 2px; */
  }
  .hr-search-tab-content {
    background: #fff;
    z-index: 999;
    padding: 20px;
  }
</style>

<style lang="less" scoped>
  @import '../../style/variable.less';
  .hr-search-tab-container {
    padding-top: @tab-height;
    height: calc(100% - @tab-height);
  }
</style>

