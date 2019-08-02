<template>
  <div class="hr-list-container">
    <div class="hr-list-content">
      <template v-for="(item, index) in filterData(data, 'string')">
        <div :key="index" class="hr-list-item overflowtext">
          {{item.label}}
        </div>
      </template>
    </div>

    <div class="hr-list-group" v-for="(item, index) in filterData(data, 'array')" :key="index">
        
        <div class="hr-list-group-title" v-if="item.label">
          {{item.label}}
        </div>
        <hr-list :data="item.value"></hr-list>
    </div>

  </div>
</template>

<script>
export default {
  name: 'hr-list',
  props: {
    data: {
      type: Array
    },
    value: {}
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },
  methods: {
    filterData(data, type) {
      return data.filter(item => Object.prototype.toString.call(item.value).slice(8, -1).toLowerCase() === type)
    },
    handleChange() {
      this.$emit('after-change', this.value)
    }
  }
}
</script>

<style lang="less" scoped>
  @marginRight: 13px;

  .hr-list-content {
    display: flex;
    justify-content: flex-start;
    margin-right: -@marginRight;
  }
  .hr-list-item {
    flex: 1 1 83px;
    margin-bottom: 20px;
    margin-right: @marginRight;
    padding: 4px;
    border: 1px solid #dfdfe0;
    display: inline-block;
    font-size: 14px;
    color: #76767c;
    height: 21px;
    line-height: 21px;
    text-align: center;
    max-width: 27%;
  }
  .hr-list-group-title {
    // display: flex;
    font-size: 15px;
    line-height: 1em;
    margin-bottom: 20px;
    color: #1d1d26;
  }
</style>
