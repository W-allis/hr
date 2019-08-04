<template>
  <div class="hr-share-container">
  
    <hr-search-tab :contentstyle="{ padding: '0' }" :navstyle="{ boxShadow: 'none', background: '#fff' }">
      <hr-search-tab-item :tab-name="'职位分享'" :iconstyle="{ color: '#fff' }" @click.native="shareDegree"></hr-search-tab-item>
      <hr-search-tab-item :tab-name="'职位收藏'" :iconstyle="{ color: '#fff' }" @click.native="containsDegree"></hr-search-tab-item>
    </hr-search-tab>
  </div>  
</template>

<script>
export default {
  methods: {
    shareDegree() {

    },
    containsDegree() {

    }
  } 
}
</script>

<style lang="less" scoped>

</style>
