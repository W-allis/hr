<template>
  <div class="hr-degree-container">
    <img src="http://wetalent.pingan.com/static/template/images/1_campus_banner.png" alt="">
    <div class="hr-degree-content">
      <hr-input>
        <template v-slot:prepend>
          <i class="cubeic-search"></i>
        </template>
      </hr-input>
      <hr-search-tab v-model="searchTab" :initstyle="{ background: 'transparent', color: '#fff' }" :contentstyle="{ padding: '0' }" @after-click="afterTabClick">
        <hr-search-tab-item v-for="(tab, index) in searchtabList" :key="index" :tab-name="tab.name" :iconstyle="{ color: '#fff' }"></hr-search-tab-item>
      </hr-search-tab>
      <hr-card v-for="(degree, index) in degreeList" :key="index" :title="degree.title" :hide-tag="!degree.isInternship" :tag="'实习生'">
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

export default {
  mixins: [searchMixin],
  data() {
    return {
      degreeList: [...Array(20).keys()].map(item => ({ title: 'web前端开发工程师', department: '信息科技部', type: '营销类', isInternship: [true, false][Math.round(Math.random())], jobCity: '上海' })),
    }
  },
  mounted() {
  },
  methods: {
    
  }
}
</script>

<style scoped>
  .hr-degree-container {
    /* position: relative; */
    /* z-index: 999; */
  }
  .hr-degree-content {
    padding: 0 15px;
    margin-top: -100px;
    z-index: 1001;
    /* position: absolute;
    right: 0;
    left: 0;
    top: 110px; */
  }
  li {
    margin-bottom: 5px;
    font-size: 11px;
    color: #1d1d26;
    opacity: .7;
  }
</style>
