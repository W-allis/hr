<template>
  <div 
  class="hr-search-tab-item-container" 
  v-if="isActive"
  :style="initstyle" 
  @click="handleTabChange">
    
    <div class="hr-search-tab-item-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hr-search-tab-item',
  props: {
    tabName: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    initstyle: {},
    iconstyle: {}
  },
  created() {
    // console.log(this.$parent)
  },
  updated() {
    this.$parent.$emit('tab-nav-update')
  },
  methods: {
    handleTabChange() {

    }
  },
  computed: {
    isActive() {
      return this.$parent.value === this.tabName
    }
  }  
}
</script>

<style scoped>
  .hr-search-tab-item-container {
    font-size: 14px;
    flex: 1;
  }
</style>
