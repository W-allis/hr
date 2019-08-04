<template>
  <div class="hr-teach-in-container">
    <div class="hr-teach-in-search">
      <hr-search-tab v-model="searchTab" :contentstyle="{ padding: '0' }" @after-tab-click="afterTabClick">
        <hr-search-tab-item v-for="(tab, index) in searchtabList" :key="index" :tab-name="tab.name"></hr-search-tab-item>
      </hr-search-tab>
    </div>
    <div class="hr-teach-in-list">
      <hr-card v-for="(teachin, index) in teachInList" :key="index" :tagstyle="{ color: '#9c9da5', background: 'transparent' }" :title="teachin.school" :hide-tag="false" :tag="teachin.intro" @click.native="afterCardClick(degree.title)">
        <template v-slot:operator>
          <span >{{teachin.company}}</span>
        </template>
        <div class="hr-teach-in-content">
          <li class="overflowtext">
            {{teachin.time}}{{teachin.position}}
          </li>
          <li>
            {{teachin.location}}
          </li>
        </div>
      </hr-card>
    </div>
  </div>
</template>

<script>
import searchMixin from '../mixins/hr-search-tab'
import degreeDetailsMixin from '../mixins/hr-degree-details'

export default {
  mixins: [searchMixin, degreeDetailsMixin],
  data() {
    return {
      teachInList: [...Array(20).keys()].map(item => ({ school: '哈佛大学', time: '03月19日 周二', position: '13:00~15:00', company: '云南信托', location: '中国', intro: '专场介绍' })),
    }
  },
}
</script>

<style scoped>
  .hr-teach-in-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;
  }
  .hr-teach-in-content {
    display: flex;
    justify-content: space-between;
  }
</style>

<style lang="less" scoped>
  @import '../../style/variable.less';

  .hr-teach-in-container {
    padding-top: @routebar-height;
  }
  .hr-teach-in-list {
    padding: 10px 15px 0;
  }
</style>
