<template>
  <div class="hr-card-container">
    <div class="hr-card">
      <div class="hr-card-header">
        <div class="hr-card-header-intro overflowtext">
          <slot name="title">
            <span class="hr-card-header-title overflowtext">{{title}}</span>
          </slot>
          <template v-if="!hideTag">
            <slot name="tag">
              <div class="hr-card-header-tag" :style="tagstyle">
                {{tag}}
              </div>
            </slot>
          </template>
        </div>
        <div class="hr-card-header-operator overflowtext">
          <slot name="operator">
            <i :class="icon" @click="handleOpeartor"></i>  
          </slot>
        </div>
      </div>        
      <div class="hr-card-body">
        <slot>
          {{content}}
        </slot>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'hr-card',
  props: {
    title: {
      type: String
    },
    icon: {
      type: String,
      default: 'cubeic-setting'
    },
    content: {
      type: String
    },
    tag: {
      type: String
    },
    hideTag: {
      type: Boolean,
      default: false
    },
    tagstyle: {}
  },
  methods: {
    handleOpeartor() {
      this.$emit('operator-callback')
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../../style/variable.less';

  // .hr-card-container ~ .hr-card-container {
  //   }

  .hr-card-container {
    margin-bottom: 10px;
    position: relative;
    z-index: 999;
    .hr-card {
      padding: 13px 20px;
      background-color: #fff;
      border-radius: 2px;
    }
    .hr-card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      -webkit-box-pack: justify;
      height: 22px;
      margin-bottom: 8px;
    }
    .hr-card-header-intro {
      font-size: 15px;
      color: #1d1d26;
      line-height: 16px;
      display: flex;
      min-width: 60%;
      -webkit-box-align: center;
    }
    .hr-card-header-title {
      display: block;
    }
    .hr-card-header-operator {
      color: #7d8292;
      font-size: 12px;
      letter-spacing: 0;
    }
    .hr-card-header-tag {
      min-width: 40px;
      height: 16px;
      margin: 0 13px;
      font-size: 10px;
      color: @main-color;
      background-color: #FEF6F3;
      text-align: center;
      border-radius: 2px;
      // border: 0.5px solid @main-color;
    }
  }
</style>

<style scoped>

</style>
