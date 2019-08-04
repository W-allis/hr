<template>
  <div class="hr-search-container">
    <div class="hr-search-search">
      <hr-search-tab v-model="searchTab" :initstyle="{ background: 'transparent' }" :hide-content="!searchShow" :navstyle="{ position: 'fixed', background: '#fff' }" @after-tab-click="handleSearchTabClick">
        <hr-search-tab-item v-for="(tab, index) in searchtabList" :key="index" :tab-name="tab.name" :title="tab.name">
          <div class="hr-search-search-content">
            <hr-list :data="searchList" @after-change="handleSearch"></hr-list>
          </div>
        </hr-search-tab-item>
      </hr-search-tab>
    </div>
    <div class="hr-search-content" v-show="!searchShow">
      <hr-card v-for="(degree, index) in degreeList" :key="index" :title="degree.title" :hide-tag="!degree.isInternship" :tag="'实习生'" @click.native="afterCardClick(degree.title)">
        <template v-slot:operator>
          <span >{{degree.type}}</span>
        </template>
        <li class="overflowtext">
          {{degree.department}}
        </li>
        <li class="overflowtext">
          工作地点：{{degree.jobCity}}
        </li>
      </hr-card>
    </div>
  </div>
</template>

<script>
import searchMixin from '../mixins/hr-search-tab'
import degreeMixin from '../mixins/hr-search-list'
import degreeDetailsMixin from '../mixins/hr-degree-details'

export default {
  mixins: [searchMixin, degreeMixin, degreeDetailsMixin],
  data() {
    return {
      searchShow: true,
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
  },
  methods: {
    handleSearch(value) {
      console.log(value)
      this.searchShow = false
    },
    handleSearchTabClick() {
      this.searchShow = true
    }
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
    position: fixed;
    z-index: 1003;
    width: 100%;
  }
  .hr-search-content {
    // padding: 20px;
    padding-top: 55px; 
  }
</style>