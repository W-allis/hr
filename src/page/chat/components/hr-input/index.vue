<template>
  <div class="hr-input-container">
    <cube-input v-model="value" :placeholder="placeholder">
      <template v-slot:prepend>
        <div class="hr-input-prepend">
          <slot name="prepend"></slot>
        </div>
      </template>
    </cube-input>
  </div>
</template>

<script>
export default {
  name: 'hr-input',
  props: {
    value: {},
    placeholder: {
      type: String,
      default: '请输入关键词'
    }
  },
  model: {
    prop: 'value',
    event: 'update:value'
  }
}
</script>

<style scoped>
  .hr-input-prepend {
    height: 100%;
    width: 36px;
    text-align: right;
  }
  .hr-input-container >>> .cube-input {
    background-color: #f7f8fa;
    opacity: .7;
  }
  .hr-input-container >>> .cube-input input::-webkit-input-placeholder {
    color: #666;
  }
  .hr-input-container >>> .cube-input-field {
    padding: 7px 10px;
  }
</style>
