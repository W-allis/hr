<template>
  <div class="hr-search-container">
    <div class="hr-search-search">
      <hr-search-tab v-model="searchTab" :initstyle="{ background: 'transparent' }" :navstyle="{ position: 'fixed' }">
        <hr-search-tab-item v-for="(tab, index) in searchtabList" :key="index" :tab-name="tab.name" :title="tab.name">
          <div class="hr-search-content">
            <hr-list :data="searchList"></hr-list>
          </div>
        </hr-search-tab-item>
      </hr-search-tab>
    </div>
    
  </div>
</template>

<script>
import searchMixin from '../mixins/hr-search-tab'

export default {
  mixins: [searchMixin],
  data() {
    return {
      searchList: [
        { value: 'one', label: '最近一个月多三天' },
        { value: [
          { value: 'one', label: '最近一个月' },
          { value: 'one', label: '最近一个月' }
        ], label: '' },
        { value: [
          { value: 'one', label: '一个月' },
          { value: 'one', label: '最近一个月' },
          { value: 'one', label: '最近一个月多三天' }
        ], label: '最近一个月' }
      ]
    }
  },
  created() {
    this.searchTab = this.$route.query.target || '专业公司'
  }
}
</script>

<style lang="less" scoped>
  .hr-search-container {
    position: relative;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: #fff;
    height: 100%;
  }
  .hr-search-search {
    height: 100%;
  }
  .hr-search-content {
    // padding: 20px;
  }
</style>